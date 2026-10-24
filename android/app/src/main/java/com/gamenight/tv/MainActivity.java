package com.gamenight.tv;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class MainActivity extends Activity {
    static final String URL = "https://swoop081.github.io/game-night/";
    WebView web;
    SpeechRecognizer rec;
    String pendingLang = null;
    boolean failed = false;
    final Handler ui = new Handler(Looper.getMainLooper());

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0d0a22"));
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setUserAgentString(s.getUserAgentString() + " GameNightTV");
        web.addJavascriptInterface(new Bridge(), "GNAndroid");
        web.setWebChromeClient(new WebChromeClient() {
            @Override public void onPermissionRequest(PermissionRequest r) { r.grant(r.getResources()); }
        });
        web.setWebViewClient(new WebViewClient() {
            @Override public void onReceivedError(WebView v, WebResourceRequest q, WebResourceError e) {
                if (q.isForMainFrame()) {
                    failed = true;
                    v.loadData("<body style='background:#0d0a22;color:#fff;font:32px sans-serif;display:grid;place-items:center;height:90vh;text-align:center'><div>No internet connection.<br><small>Press OK to try again.</small></div></body>", "text/html", "utf-8");
                }
            }
        });
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED)
            requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, 1);
        web.loadUrl(URL);
        web.requestFocus();
    }

    @Override public void onWindowFocusChanged(boolean f) {
        super.onWindowFocusChanged(f);
        if (f) getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
    }

    @Override public boolean onKeyDown(int code, KeyEvent e) {
        if (failed && (code == KeyEvent.KEYCODE_DPAD_CENTER || code == KeyEvent.KEYCODE_ENTER)) {
            failed = false; web.loadUrl(URL); return true;
        }
        return super.onKeyDown(code, e);
    }

    @Override public void onBackPressed() {
        web.evaluateJavascript("window.__gnBack?window.__gnBack():false", v -> {
            if (!"true".equals(v)) finish();
        });
    }

    @Override public void onRequestPermissionsResult(int c, String[] p, int[] r) {
        if (pendingLang != null && r.length > 0 && r[0] == PackageManager.PERMISSION_GRANTED) { String l = pendingLang; pendingLang = null; startListening(l); }
    }

    @Override protected void onPause() { super.onPause(); stopListening(); }
    @Override protected void onDestroy() { super.onDestroy(); if (rec != null) { rec.destroy(); rec = null; } }

    // ---- native speech, called from the page's speech shim ----
    void js(String code) { ui.post(() -> web.evaluateJavascript(code, null)); }

    void startListening(String lang) {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            pendingLang = lang; requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, 1); return;
        }
        if (rec == null) {
            rec = SpeechRecognizer.createSpeechRecognizer(this);
            rec.setRecognitionListener(new RecognitionListener() {
                public void onReadyForSpeech(Bundle p) { js("window.__gnSR&&window.__gnSR.started()"); }
                public void onBeginningOfSpeech() {}
                public void onRmsChanged(float v) {}
                public void onBufferReceived(byte[] b) {}
                public void onEndOfSpeech() {}
                public void onEvent(int t, Bundle p) {}
                public void onPartialResults(Bundle p) { send(p, false); }
                public void onResults(Bundle p) { send(p, true); js("window.__gnSR&&window.__gnSR.ended()"); }
                public void onError(int err) {
                    String code = err == SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS ? "not-allowed" : "";
                    final String c = code;
                    // pause briefly so a failing service can't spin the page's auto-restart
                    ui.postDelayed(() -> js("window.__gnSR&&window.__gnSR.error('" + c + "')"), 300);
                }
            });
        }
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
        rec.startListening(i);
    }

    void stopListening() { if (rec != null) { try { rec.cancel(); } catch (Exception e) {} } }

    void send(Bundle p, boolean fin) {
        ArrayList<String> t = p.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (t == null || t.isEmpty()) return;
        js("window.__gnSR&&window.__gnSR.result(" + new JSONArray(t).toString() + "," + fin + ")");
    }

    class Bridge {
        @JavascriptInterface public boolean available() { return SpeechRecognizer.isRecognitionAvailable(MainActivity.this); }
        @JavascriptInterface public void start(String lang) { ui.post(() -> startListening(lang)); }
        @JavascriptInterface public void stop() { ui.post(() -> stopListening()); }
    }
}
