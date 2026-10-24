/* Game Night question bank.
   Each line: prompt|answer|accepted alternative|accepted alternative...
   The first answer is what's shown on screen. Voice accepts any of them.
   In the capitals list, the prompt can hold country alternatives after "/" (used by Name the Country). */
window.GN_RAW = [
{id:"animals",name:"Animals",kind:"emoji",hint:"Name the animal",icon:"🦊",d:`🐶|dog|puppy|pup|doggy
🐱|cat|kitten|kitty
🐭|mouse|mice|rat
🐹|hamster|guinea pig
🐰|rabbit|bunny|bunny rabbit
🦊|fox
🐻|bear|brown bear|grizzly bear|grizzly
🐻‍❄️|polar bear
🐼|panda|panda bear|giant panda
🐨|koala|koala bear
🐯|tiger
🦁|lion
🐮|cow|bull|cattle
🐷|pig|piggy|hog
🐸|frog|toad
🐵|monkey|ape|chimp|chimpanzee
🐔|chicken|hen|chook
🐓|rooster|cockerel|chicken
🐧|penguin
🦆|duck|mallard
🦅|eagle|bald eagle|hawk
🦉|owl
🐺|wolf
🐴|horse|pony
🦄|unicorn
🐝|bee|bumblebee|honey bee|honeybee
🦋|butterfly
🐌|snail
🐞|ladybird|ladybug|lady beetle|beetle
🐜|ant
🕷️|spider
🦂|scorpion
🐢|turtle|tortoise
🐍|snake|python|serpent
🦎|lizard|gecko|goanna
🐙|octopus
🦑|squid|calamari
🦀|crab
🦞|lobster|crayfish
🐡|pufferfish|blowfish|puffer fish
🐬|dolphin
🐳|whale
🦈|shark
🐊|crocodile|alligator|croc
🦓|zebra
🦍|gorilla|ape
🐘|elephant
🦛|hippo|hippopotamus
🦏|rhino|rhinoceros
🐪|camel
🦒|giraffe
🦘|kangaroo|roo|wallaby
🦔|hedgehog|echidna|porcupine
🦇|bat
🦜|parrot|macaw
🦩|flamingo
🦢|swan
🦃|turkey
🐿️|squirrel|chipmunk
🦫|beaver
🦦|otter
🦥|sloth
🦨|skunk
🦡|badger
🐆|leopard|cheetah|jaguar
🦌|deer|reindeer|stag
🐐|goat
🐑|sheep|lamb|ram
🦙|llama|alpaca
🦬|bison|buffalo
🦭|seal|sea lion
🦚|peacock|peafowl`},
{id:"food",name:"Food & Drink",kind:"emoji",hint:"Name the food",icon:"🍕",d:`🍎|apple|red apple
🍌|banana|bananas
🍇|grapes|grape
🍓|strawberry|strawberries
🍉|watermelon|melon
🍊|orange|mandarin|tangerine
🍋|lemon
🍍|pineapple
🥭|mango
🍑|peach|apricot|nectarine
🍒|cherries|cherry
🥝|kiwi|kiwifruit|kiwi fruit
🥥|coconut
🥑|avocado|avo
🍆|eggplant|aubergine
🥕|carrot
🌽|corn|sweetcorn|corn on the cob|maize
🥦|broccoli
🥒|cucumber|zucchini
🌶️|chilli|chili|chilli pepper|hot pepper|pepper
🍄|mushroom
🥔|potato|spud
🧅|onion
🧄|garlic
🍞|bread|loaf|loaf of bread|toast
🥐|croissant
🥖|baguette|french stick|french bread|bread stick
🥨|pretzel
🧀|cheese|swiss cheese
🥚|egg
🥞|pancakes|pancake|hotcakes|flapjacks
🧇|waffle
🥓|bacon
🍔|burger|hamburger|cheeseburger
🍟|chips|fries|french fries|hot chips
🍕|pizza|slice of pizza
🌭|hot dog|hotdog|frankfurt|sausage
🥪|sandwich|sanga|sanger
🌮|taco
🌯|burrito|wrap|kebab
🍣|sushi|sushi roll
🍜|noodles|ramen|noodle soup|pho
🍝|spaghetti|pasta|bolognese
🍩|doughnut|donut
🍪|cookie|biscuit|bikkie
🎂|birthday cake|cake
🧁|cupcake|muffin|fairy cake
🍦|ice cream|soft serve|ice cream cone|cone
🍫|chocolate|chocolate bar
🍿|popcorn
🥜|peanuts|peanut|nuts
🍯|honey|honey pot
☕|coffee|cappuccino|latte|hot drink
🍵|tea|green tea|matcha
🥛|milk|glass of milk
🥧|pie|apple pie
🍤|prawn|shrimp|tempura|fried prawn
🥟|dumpling|gyoza
🍗|drumstick|chicken|chicken leg
🥩|steak|meat|beef
🍚|rice|bowl of rice
🥗|salad|green salad
🍳|fried egg|egg|eggs
🧈|butter
🍭|lollipop|lolly|lollypop
🍬|lolly|sweet|candy|lollies
🥤|soft drink|soda|milkshake|drink|cup
🧃|juice box|juice|popper`},
{id:"flags",name:"Flags",kind:"emoji",hint:"Name the country",icon:"🏳️",d:`🇦🇺|australia
🇳🇿|new zealand|nz
🇺🇸|united states|usa|america|united states of america|us
🇬🇧|united kingdom|uk|britain|great britain|england
🏴󠁧󠁢󠁥󠁮󠁧󠁿|england
🏴󠁧󠁢󠁳󠁣󠁴󠁿|scotland
🏴󠁧󠁢󠁷󠁬󠁳󠁿|wales
🇨🇦|canada
🇫🇷|france
🇩🇪|germany
🇮🇹|italy
🇪🇸|spain
🇵🇹|portugal
🇳🇱|netherlands|holland
🇧🇪|belgium
🇨🇭|switzerland
🇦🇹|austria
🇸🇪|sweden
🇳🇴|norway
🇩🇰|denmark
🇫🇮|finland
🇮🇪|ireland
🇬🇷|greece
🇹🇷|turkey|turkiye
🇵🇱|poland
🇺🇦|ukraine
🇷🇺|russia
🇭🇺|hungary
🇷🇴|romania
🇭🇷|croatia
🇮🇸|iceland
🇨🇿|czechia|czech republic
🇯🇵|japan
🇨🇳|china
🇰🇷|south korea|korea
🇮🇳|india
🇵🇰|pakistan
🇱🇰|sri lanka
🇳🇵|nepal
🇮🇩|indonesia
🇹🇭|thailand
🇻🇳|vietnam
🇵🇭|philippines
🇲🇾|malaysia
🇸🇬|singapore
🇭🇰|hong kong
🇧🇷|brazil
🇦🇷|argentina
🇲🇽|mexico
🇨🇱|chile
🇨🇴|colombia
🇵🇪|peru
🇺🇾|uruguay
🇯🇲|jamaica
🇨🇺|cuba
🇿🇦|south africa
🇪🇬|egypt
🇲🇦|morocco
🇳🇬|nigeria
🇰🇪|kenya
🇬🇭|ghana
🇸🇦|saudi arabia
🇦🇪|united arab emirates|uae|emirates
🇮🇱|israel
🇫🇯|fiji
🇼🇸|samoa
🇵🇬|papua new guinea|png`},
{id:"capitals",name:"Capital Cities",kind:"text",hint:"Name the capital",icon:"🏛️",d:`France|paris
Italy|rome
Spain|madrid
Germany|berlin
Japan|tokyo
Australia|canberra
New Zealand/NZ|wellington
Canada|ottawa
United States/USA/America/US|washington|washington dc|dc
England/UK/United Kingdom|london
Ireland|dublin
Scotland|edinburgh
Wales|cardiff
Northern Ireland|belfast
Portugal|lisbon
Greece|athens
Russia|moscow
China|beijing
South Korea/Korea|seoul
Thailand|bangkok
Egypt|cairo
Netherlands/Holland|amsterdam
Belgium|brussels
Austria|vienna
Hungary|budapest
Poland|warsaw
Czechia/Czech Republic|prague
Sweden|stockholm
Norway|oslo
Denmark|copenhagen
Finland|helsinki
Iceland|reykjavik
Turkey/Turkiye|ankara
India|new delhi|delhi
Pakistan|islamabad
Nepal|kathmandu
Indonesia|jakarta
Philippines|manila
Vietnam|hanoi
Malaysia|kuala lumpur|kl
Mongolia|ulaanbaatar|ulan bator
Argentina|buenos aires
Brazil|brasilia
Mexico|mexico city
Peru|lima
Chile|santiago
Venezuela|caracas
Uruguay|montevideo
Jamaica|kingston
Cuba|havana
Colombia|bogota
Kenya|nairobi
Nigeria|abuja
Morocco|rabat
Switzerland|bern|berne
Ukraine|kyiv|kiev
Croatia|zagreb
Romania|bucharest
Bulgaria|sofia
Serbia|belgrade
Fiji|suva
Samoa|apia
Papua New Guinea/PNG|port moresby
Saudi Arabia|riyadh
Iran|tehran
Iraq|baghdad`},
{id:"countries",name:"Name the Country",kind:"text",hint:"Which country has this capital?",icon:"🗺️",from:"capitals"},
{id:"elements",name:"Element Symbols",kind:"text",hint:"Name the element",icon:"⚗️",d:`H|hydrogen
He|helium
Li|lithium
C|carbon
N|nitrogen
O|oxygen
F|fluorine
Ne|neon
Na|sodium
Mg|magnesium
Al|aluminium|aluminum
Si|silicon
P|phosphorus
S|sulphur|sulfur
Cl|chlorine
Ar|argon
K|potassium
Ca|calcium
Fe|iron
Cu|copper
Zn|zinc
Ag|silver
Au|gold
Pb|lead
Sn|tin
Hg|mercury
Pt|platinum
Ni|nickel
U|uranium
I|iodine
Co|cobalt
Ti|titanium
Mn|manganese
Cr|chromium
W|tungsten
Ra|radium
Rn|radon
Kr|krypton
B|boron
Be|beryllium
Xe|xenon
Br|bromine
Pu|plutonium`},
{id:"sports",name:"Sports",kind:"emoji",hint:"Name the sport",icon:"🏀",d:`⚽|soccer|football|footy
🏀|basketball|netball
🏈|american football|gridiron|nfl|football
⚾|baseball|softball
🎾|tennis
🏐|volleyball|beach volleyball
🏉|rugby|rugby league|rugby union|league|aussie rules|afl|footy
🎱|pool|billiards|snooker|eight ball|8 ball
🏓|table tennis|ping pong
🏸|badminton
🏒|ice hockey|hockey
🏏|cricket
⛳|golf
🏹|archery|bow and arrow
🎣|fishing
🥊|boxing
🥋|karate|judo|martial arts|taekwondo|jiu jitsu|kung fu
⛸️|ice skating|skating|figure skating
🎿|skiing|ski
🏂|snowboarding|snowboard
🏄|surfing|surf
🏊|swimming|swim
🚴|cycling|bike riding|biking|bike racing|bmx
🏇|horse racing|racing|horse riding|equestrian|jockey
🤺|fencing
🏋️|weightlifting|weight lifting|weights|powerlifting|lifting|bodybuilding
🤸|gymnastics|cartwheel|tumbling
🧗|rock climbing|climbing|bouldering
🛹|skateboarding|skating|skateboard
🎳|bowling|ten pin bowling|tenpin|ten pin
🤽|water polo
🚣|rowing|boating
🤼|wrestling
🛶|canoeing|kayaking|canoe|kayak
🪂|skydiving|parachuting|paragliding
🏎️|formula one|formula 1|motor racing|car racing|f1|racing|motorsport
🎯|darts
🥌|curling
♟️|chess
🤿|scuba diving|diving|snorkelling|snorkeling|scuba`},
{id:"transport",name:"Transport",kind:"emoji",hint:"Name the vehicle",icon:"🚀",d:`🚗|car|automobile
🚙|suv|four wheel drive|4wd|jeep|car
🛻|ute|pickup|pickup truck|truck
🚕|taxi|cab|taxi cab
🚌|bus|coach
🏎️|race car|racing car|formula one|f1 car|f1
🚓|police car|cop car|police
🚑|ambulance
🚒|fire engine|fire truck|firetruck
🚐|van|minivan|minibus|kombi
🚚|truck|lorry|delivery truck|van
🚛|semi trailer|truck|semi|lorry|big rig|articulated lorry
🚜|tractor
🛵|scooter|moped|vespa|motor scooter
🏍️|motorbike|motorcycle|bike|motor bike
🚲|bicycle|bike|push bike|pushbike
🛴|kick scooter|scooter
🚂|steam train|train|locomotive|choo choo
🚇|metro|subway|underground|train|tube
🚊|tram|streetcar|trolley|light rail
🚝|monorail|train
🚁|helicopter|chopper
✈️|plane|aeroplane|airplane|jet|aircraft
🚀|rocket|spaceship|rocket ship
🛸|ufo|flying saucer|spaceship
⛵|sailboat|yacht|sailing boat|boat
🚤|speedboat|boat|motorboat|power boat
🛳️|cruise ship|ship|ocean liner|boat
⛴️|ferry|boat|ship
🛶|canoe|kayak
🚠|cable car|gondola|chairlift
🛺|tuk tuk|rickshaw|auto rickshaw
🦽|wheelchair
🛷|sled|sledge|toboggan|sleigh
🚡|aerial tramway|cable car|gondola`},
{id:"people",name:"Who Am I?",kind:"emoji",hint:"Name the job or character",icon:"🧑‍🚀",d:`🧑‍🚒|firefighter|fireman|firie|fire fighter
👮|police officer|policeman|policewoman|cop|police
🧑‍⚕️|doctor|nurse|gp|health worker
🧑‍🍳|chef|cook|baker
🧑‍🏫|teacher|professor
🧑‍🔧|mechanic|plumber|tradie|technician
🧑‍🌾|farmer|gardener
🧑‍🚀|astronaut|spaceman|cosmonaut
🧑‍✈️|pilot|captain
🧑‍🔬|scientist|chemist
🧑‍💻|programmer|coder|developer|hacker|software engineer|computer programmer
🧑‍🎨|artist|painter
🧑‍🎤|singer|rock star|rockstar|pop star|musician
👷|builder|construction worker|tradie|worker
💂|guard|soldier|royal guard|kings guard|queens guard|beefeater
🕵️|detective|spy|private investigator|sherlock
🧑‍⚖️|judge
🤴|prince|king
👸|princess|queen
🧙|wizard|magician|sorcerer
🎅|santa|santa claus|father christmas
🤡|clown
🥷|ninja
🧛|vampire|dracula
🧜‍♀️|mermaid
🧚|fairy
🦸|superhero|hero
🦹|villain|supervillain|bad guy
🤠|cowboy|cowgirl
👰|bride
🤵|groom|bridegroom|butler
🧟|zombie
👻|ghost
🤖|robot
👽|alien
🧞|genie
🧝|elf
👼|angel|cherub
💃|dancer|flamenco dancer|salsa dancer
🏴‍☠️|pirate|pirate flag|jolly roger`},
{id:"colours",name:"Colours",kind:"color",hint:"Name the colour",icon:"🎨",d:`#e02424|red|scarlet
#ff8a00|orange
#ffd600|yellow
#1fa83a|green|emerald
#1f5fe0|blue|royal blue
#7b2ee0|purple|violet
#ff6fb5|pink
#7a4a22|brown|chocolate
#111111|black
#ffffff|white
#8c8c8c|grey|gray|silver
#0b1f5c|navy|navy blue|dark blue
#0e9c9c|teal|blue green
#40e0d0|turquoise|aqua|aquamarine
#7a0e26|maroon|burgundy|dark red|wine
#e8d9b5|beige|cream|tan|sand
#9be22d|lime|lime green
#00e5ff|cyan|aqua|light blue
#ff1fd0|magenta|hot pink|fuchsia
#c7a6ff|lavender|lilac|light purple
#6b7a1e|olive|olive green|khaki
#ff7f61|coral|salmon|peach
#a8f0c8|mint|mint green|light green
#87ceeb|sky blue|light blue|baby blue
#d4af37|gold|golden|mustard
#4b0082|indigo|dark purple
#ffb6c1|light pink|pink|baby pink
#006400|dark green|forest green|bottle green`},
{id:"weather",name:"Nature & Sky",kind:"emoji",hint:"Name it",icon:"🌈",d:`☀️|sun|sunny|sunshine
🌙|moon|crescent moon|crescent|half moon
⭐|star
☁️|cloud|cloudy
🌧️|rain|rain cloud|raining
⛈️|storm|thunderstorm|thunder|thunder and lightning
🌈|rainbow
❄️|snowflake|snow|ice
⛄|snowman
🌪️|tornado|twister|cyclone|hurricane
🌊|wave|ocean|sea|surf|tsunami
🔥|fire|flame|flames
⚡|lightning|lightning bolt|thunderbolt|electricity
🌋|volcano
🏔️|mountain|mountains|snowy mountain
🏝️|island|desert island
🏜️|desert
🌵|cactus
🌴|palm tree|palm|coconut tree
🌲|pine tree|tree|christmas tree|fir tree
🌳|tree|oak tree
🍁|maple leaf|leaf|autumn leaf
🌻|sunflower
🌹|rose
🌷|tulip
🌸|cherry blossom|blossom|flower|sakura
🌺|hibiscus|flower
🌼|daisy|flower
🍀|four leaf clover|clover|shamrock
🌍|earth|world|globe|planet|planet earth
☄️|comet|meteor|asteroid|shooting star
🪐|saturn|planet
💧|water drop|droplet|raindrop|water|drop|tear
🌱|seedling|sprout|plant|seed
🍂|autumn leaves|leaves|fallen leaves
🌫️|fog|mist|haze|smoke
🌕|full moon|moon
🌅|sunrise|sunset
🪨|rock|stone|boulder
🌬️|wind|windy|breeze`},
{id:"objects",name:"Everyday Objects",kind:"emoji",hint:"Name the object",icon:"🔑",d:`🔑|key
🔒|lock|padlock
⏰|alarm clock|clock|alarm
⌚|watch|wristwatch|smartwatch
📱|phone|mobile|mobile phone|iphone|cell phone|smartphone
💻|laptop|computer|macbook|notebook
⌨️|keyboard
📷|camera
📺|tv|television|telly
📻|radio
💡|light bulb|lightbulb|bulb|globe|idea
🔦|torch|flashlight
🕯️|candle
🪑|chair|seat|stool
🛏️|bed
🛋️|couch|sofa|lounge|settee
🚪|door
🚽|toilet|dunny|loo
🛁|bath|bathtub
🪞|mirror
🧽|sponge
🧹|broom|broomstick
🧺|basket|laundry basket|picnic basket
🪣|bucket|pail
🧻|toilet paper|toilet roll|loo roll|paper towel
🪥|toothbrush
🧼|soap
✂️|scissors
📎|paperclip|paper clip
✏️|pencil
📏|ruler
📚|books|book
📦|box|package|parcel|cardboard box
🎁|present|gift
🎈|balloon
🔨|hammer
🔧|spanner|wrench
🪜|ladder
🧲|magnet
🔋|battery
🧳|suitcase|luggage
🧸|teddy bear|teddy
☂️|umbrella|brolly
👓|glasses|spectacles|specs
🕶️|sunglasses|sunnies|shades
👑|crown
💍|ring|diamond ring|engagement ring
🎒|backpack|school bag|bag|rucksack
👟|sneaker|shoe|runner|trainer
🧦|socks|sock
🧤|gloves|glove
🧣|scarf
🎩|top hat|hat
🎸|guitar
🎹|piano|keyboard
🎺|trumpet
🎷|saxophone|sax
🥁|drum|drums
🎻|violin|fiddle|cello
🪗|accordion
🎤|microphone|mic`},
{id:"movies",name:"Emoji Movies",kind:"emoji",hint:"Name the movie",icon:"🎬",d:`🦁👑|the lion king|lion king
🕷️🧑|spider man|spiderman
❄️👸|frozen
🧙‍♂️💍|lord of the rings|the hobbit
⚡🧙|harry potter
🚢🧊|titanic
🦖🏝️|jurassic park|jurassic world
👻🔫|ghostbusters|ghost busters
🐠🔍|finding nemo|finding dory|nemo
🏴‍☠️🌊|pirates of the caribbean
🧸🤠|toy story
🐼🥋|kung fu panda
🦇🧑|batman|the dark knight
🕶️💊|the matrix|matrix
🚗⚡|cars|lightning mcqueen
🐀👨‍🍳|ratatouille
🎈🏠|up
👽📞|et|e t|et the extra terrestrial
🦍🏙️|king kong|kong
🧞🪔|aladdin
🧜‍♀️🌊|the little mermaid|little mermaid
🐉🧒|how to train your dragon
🤖🌱|wall e|walle
🍫🏭|charlie and the chocolate factory|willy wonka|wonka
🌪️👠|the wizard of oz|wizard of oz
🔨⚡|thor
🏎️💨|fast and furious|the fast and the furious|fast and the furious
🌹👹|beauty and the beast
👨‍🚀🌌|interstellar|gravity|the martian
🏠🎄🧒|home alone
🎅🧝|elf
🤵🍸|james bond|bond|007|casino royale
🐘👂|dumbo
👧🐇🎩|alice in wonderland
🧚🏴‍☠️🐊|peter pan|hook|tinker bell
🍝🐕|lady and the tramp
🕰️🚗|back to the future
🌊🛶|moana
🐷🕸️|charlottes web
🐯🚣|life of pi
🦊🐰👮|zootopia|zootropolis
🦈🏖️|jaws
🐧💃|happy feet
🍯🐻|winnie the pooh|pooh|christopher robin
👸🍎|snow white|snow white and the seven dwarfs
🐷🌾|babe
👨‍👩‍👧‍👦🦸|the incredibles|incredibles`},
{id:"opposites",name:"Opposites",kind:"text",hint:"Say the opposite",icon:"↔️",d:`Hot|cold|freezing
Up|down
Big|small|little|tiny
Fast|slow
Happy|sad|unhappy
Day|night
Open|closed|shut|close
Left|right
Wet|dry
Early|late
Full|empty
Heavy|light
Hard|soft|easy
Loud|quiet|soft|silent
Old|new|young
Tall|short
Rich|poor
Push|pull
Win|lose|loss
In|out
First|last
Black|white
Inside|outside
Above|below|beneath|under
Buy|sell
Clean|dirty|messy
Strong|weak
Thick|thin
Sweet|sour|savoury|bitter|salty
Love|hate
Come|go|leave
Begin|end|finish|stop
North|south
East|west
True|false
Arrive|leave|depart|go
Laugh|cry
Front|back|behind
Always|never
Friend|enemy|foe
Remember|forget
Asleep|awake
Light|dark|heavy
Give|take|receive
Question|answer
Tight|loose
Rough|smooth
Brave|scared|cowardly|afraid
Polite|rude
Cheap|expensive|dear
Wide|narrow
Deep|shallow
Float|sink
Hello|goodbye|bye
Yes|no
Top|bottom`},
{id:"landmarks",name:"Landmark Cities",kind:"text",hint:"Which city is it in?",icon:"🗼",d:`Eiffel Tower|paris
Colosseum|rome
Big Ben|london
Statue of Liberty|new york|new york city|nyc
Opera House|sydney
Golden Gate Bridge|san francisco
Burj Khalifa|dubai
Taj Mahal|agra
Leaning Tower|pisa
Christ the Redeemer|rio de janeiro|rio
Brandenburg Gate|berlin
Acropolis|athens
Sagrada Familia|barcelona
The Kremlin|moscow
Forbidden City|beijing
Petronas Towers|kuala lumpur|kl
Marina Bay Sands|singapore
CN Tower|toronto
Space Needle|seattle
Hollywood Sign|los angeles|hollywood|la
Tower Bridge|london
Buckingham Palace|london
Little Mermaid Statue|copenhagen
Atomium|brussels
Sky Tower|auckland
MCG|melbourne
Flinders Street Station|melbourne
Federation Square|melbourne
Harbour Bridge|sydney
Bondi Beach|sydney
Gateway Arch|st louis|saint louis
Hagia Sophia|istanbul
The Alamo|san antonio
Louvre|paris
Notre Dame|paris
Trevi Fountain|rome
Times Square|new york|new york city|nyc
Empire State Building|new york|new york city|nyc
White House|washington|washington dc|dc
The Shard|london
Big Banana|coffs harbour|coffs
Story Bridge|brisbane
Arc de Triomphe|paris
Edinburgh Castle|edinburgh
Brooklyn Bridge|new york|new york city|nyc
Victoria Peak|hong kong
Table Mountain|cape town
Charles Bridge|prague
Grand Palace|bangkok
Shibuya Crossing|tokyo
Merlion|singapore
Burj Al Arab|dubai`},
{id:"sayings",name:"Finish the Saying",kind:"text",hint:"Finish it",icon:"💬",d:`Actions speak louder than…|words
The early bird catches the…|worm
Don't count your chickens before they…|hatch|hatched|are hatched
An apple a day keeps the…|doctor away|doctor
Every cloud has a silver…|lining
Better late than…|never
Curiosity killed the…|cat
Practice makes…|perfect
When in Rome, do as the…|romans|romans do
Two heads are better than…|one
A picture is worth a thousand…|words
Don't judge a book by its…|cover
The grass is always greener on the other…|side
Rome wasn't built in a…|day
Laughter is the best…|medicine
Too many cooks spoil the…|broth
Where there's smoke there's…|fire
Birds of a feather flock…|together
You can't teach an old dog new…|tricks
Fortune favours the…|brave|bold
Out of sight, out of…|mind
Beauty is in the eye of the…|beholder
It takes two to…|tango
Honesty is the best…|policy
Look before you…|leap
Absence makes the heart grow…|fonder
Barking up the wrong…|tree
A watched pot never…|boils
The pen is mightier than the…|sword
Strike while the iron is…|hot
Every dog has its…|day
Kill two birds with one…|stone
Don't put all your eggs in one…|basket
Easy come, easy…|go
Great minds think…|alike
Slow and steady wins the…|race
Don't cry over spilt…|milk
Let sleeping dogs…|lie
The apple doesn't fall far from the…|tree
Once bitten, twice…|shy
Home is where the…|heart is|heart
All's well that ends…|well`},
{id:"slang",name:"Aussie Slang",kind:"text",hint:"What does it mean?",icon:"🦘",d:`Arvo|afternoon|this afternoon
Brekkie|breakfast
Servo|service station|petrol station|gas station|garage
Thongs|flip flops|sandals|jandals|slides
Ute|utility|utility vehicle|pickup|pickup truck|truck
Barbie|barbecue|bbq|barbeque|grill
Sunnies|sunglasses|shades
Bottle-o|bottle shop|liquor store|bottle store|bottlo
Maccas|mcdonalds|macdonalds
Footy|football|aussie rules|afl|rugby
Mozzie|mosquito
Cuppa|cup of tea|tea|cup of coffee|coffee|a cup
Esky|cooler|cool box|icebox|ice box|chilly bin|cooler box
Bikkie|biscuit|cookie
Chook|chicken|hen
Tradie|tradesman|tradesperson|tradie|builder|plumber|electrician
Rellies|relatives|relations|family|rellos
Choccy|chocolate
Smoko|smoke break|tea break|break|morning tea
Sanga|sandwich|sanger
Doona|duvet|quilt|comforter|blanket
Togs|swimsuit|swimmers|bathers|swimming costume|cossie|swimwear
Cozzie|swimsuit|swimmers|bathers|swimming costume|togs|swimwear
Dunny|toilet|loo|outhouse|bathroom
Postie|postman|mail carrier|post man|mailman|postal worker
Garbo|garbage collector|garbage man|bin man|rubbish collector|garbage truck
Brolly|umbrella
Snag|sausage
Roo|kangaroo
Uni|university|college
Devo|devastated|very sad|upset
Stoked|happy|thrilled|excited|pleased|very happy
Heaps|lots|a lot|many|very|plenty|loads
Fair dinkum|genuine|true|real|honest|really|seriously
Ambo|ambulance|paramedic|ambulance officer|ambulance driver
Firie|firefighter|fireman|fire fighter|fire brigade
Lollies|sweets|candy|lolly
Bloke|man|guy|fella
Sheila|woman|girl|lady
Straya|australia
Avo|avocado
Ripper|great|excellent|fantastic|awesome|amazing|terrific
Hard yakka|hard work|work
Sickie|sick day|day off
Trackies|tracksuit|track pants|tracksuit pants|sweatpants
Budgie smugglers|speedos|swimming trunks|briefs|swimmers|togs
Daggy|uncool|unfashionable|nerdy|dorky
Hooroo|goodbye|bye|see you
G'day|hello|hi|good day
Mate|friend|buddy|pal
Gobsmacked|amazed|astonished|shocked|surprised
Knackered|tired|exhausted|worn out
Woop Woop|middle of nowhere|nowhere|outback|remote
Chockers|full|packed|crowded
Pokies|poker machines|slot machines|slots
Ankle biter|child|kid|toddler|small child
Bludger|lazy person|slacker|lazy
Rapt|delighted|happy|thrilled|pleased`},
{id:"footy",name:"Footy Nicknames",kind:"text",hint:"Name the club",icon:"🏉",d:`AFL · Magpies|collingwood|collingwood magpies
AFL · Bombers|essendon
AFL · Blues|carlton
AFL · Tigers|richmond
AFL · Hawks|hawthorn
AFL · Cats|geelong
AFL · Swans|sydney|sydney swans
AFL · Lions|brisbane|brisbane lions
AFL · Eagles|west coast|west coast eagles
AFL · Dockers|fremantle|freo
AFL · Crows|adelaide|adelaide crows
AFL · Power|port adelaide|port|port power
AFL · Saints|st kilda|saint kilda
AFL · Demons|melbourne|melbourne demons
AFL · Kangaroos|north melbourne|north|the roos
AFL · Bulldogs|western bulldogs|footscray|the dogs
AFL · Suns|gold coast|gold coast suns
AFL · Giants|gws|greater western sydney|gws giants
NRL · Rabbitohs|south sydney|souths
NRL · Roosters|sydney|easts|eastern suburbs|sydney roosters
NRL · Broncos|brisbane|brisbane broncos
NRL · Storm|melbourne|melbourne storm
NRL · Panthers|penrith|penrith panthers
NRL · Eels|parramatta|parra
NRL · Sharks|cronulla|cronulla sutherland
NRL · Sea Eagles|manly|manly warringah
NRL · Raiders|canberra|canberra raiders
NRL · Knights|newcastle|newcastle knights
NRL · Cowboys|north queensland|townsville
NRL · Titans|gold coast|gold coast titans
NRL · Dragons|st george|st george illawarra|saint george|illawarra
NRL · Bulldogs|canterbury|canterbury bankstown|bankstown
NRL · Wests Tigers|wests|western suburbs|balmain
NRL · Warriors|new zealand|auckland|nz warriors
NRL · Dolphins|redcliffe|the dolphins|dolphins`},
{id:"babies",name:"Baby Animals",kind:"text",hint:"What's the baby called?",icon:"🐣",d:`Kangaroo|joey
Cat|kitten|kitty
Dog|puppy|pup
Cow|calf
Sheep|lamb
Horse|foal|colt|filly
Goat|kid
Pig|piglet
Duck|duckling
Goose|gosling
Frog|tadpole|froglet
Swan|cygnet
Bear|cub
Lion|cub
Deer|fawn
Owl|owlet|chick
Eagle|eaglet|chick
Koala|joey
Hen|chick
Butterfly|caterpillar|larva
Seal|pup|cub
Whale|calf
Elephant|calf
Rabbit|kit|kitten|bunny
Fox|kit|cub|pup
Hare|leveret
Turkey|poult|chick
Pigeon|squab|chick
Zebra|foal
Donkey|foal
Wombat|joey
Shark|pup
Tiger|cub
Dolphin|calf
Chicken|chick
Platypus|puggle
Echidna|puggle
Giraffe|calf
Penguin|chick
Fish|fry
Spider|spiderling
Camel|calf
Hippo|calf
Beaver|kit`},
{id:"times",name:"Times Tables",kind:"math",hint:"Quick, multiply",icon:"✖️"},
{id:"scramble",name:"Unscramble",kind:"tiles",hint:"Unscramble the word",icon:"🔤",words:"apple,beach,chair,dance,eagle,flame,grape,house,juice,knife,lemon/melon,mango,night/thing,ocean/canoe,piano,queen,river,snake,table/bleat,water,zebra,bread/beard,cloud,dream/armed,earth/heart,fruit,ghost,laugh,money,party,robot,smile/slime/miles/limes,tiger,train,watch,plant,sport/ports/strop,storm,candy,horse/shore,mouse,shark,clock,brain,phone,light,music,pizza,happy,funny,green,jelly,lucky,magic,noisy,pasta,quiet,sunny,teeth,uncle,video,woman,young"}
];
