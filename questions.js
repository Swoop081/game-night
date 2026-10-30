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
{id:"elements",name:"Periodic Table",kind:"element",hint:"Name the element",icon:"⚗️",d:`1 H|hydrogen
2 He|helium
3 Li|lithium
4 Be|beryllium
5 B|boron
6 C|carbon
7 N|nitrogen
8 O|oxygen
9 F|fluorine
10 Ne|neon
11 Na|sodium
12 Mg|magnesium
13 Al|aluminium|aluminum
14 Si|silicon
15 P|phosphorus
16 S|sulphur|sulfur
17 Cl|chlorine
18 Ar|argon
19 K|potassium
20 Ca|calcium
22 Ti|titanium
24 Cr|chromium
25 Mn|manganese
26 Fe|iron
27 Co|cobalt
28 Ni|nickel
29 Cu|copper
30 Zn|zinc
33 As|arsenic
35 Br|bromine
36 Kr|krypton
38 Sr|strontium
46 Pd|palladium
47 Ag|silver
48 Cd|cadmium
50 Sn|tin
51 Sb|antimony
53 I|iodine
54 Xe|xenon
55 Cs|caesium|cesium
56 Ba|barium
74 W|tungsten
78 Pt|platinum
79 Au|gold
80 Hg|mercury
82 Pb|lead
83 Bi|bismuth
86 Rn|radon
88 Ra|radium
92 U|uranium
94 Pu|plutonium
99 Es|einsteinium`},
{id:"roman",name:"Roman Numerals",kind:"roman",hint:"What number is it?",icon:"🏛️"},
{id:"plants",name:"Plants & Flowers",kind:"text",hint:"Name the plant",icon:"🌿",d:`Australia's national flower|golden wattle|wattle
Tall yellow flower that turns to face the sun|sunflower
Red flower given on Valentine's Day|rose
The red flower worn for Remembrance Day|poppy
Spiky desert plant that stores water|cactus
Koalas eat its leaves|eucalyptus|gum tree|gum
Giant pandas eat it|bamboo
Japan's famous pink spring blossom|cherry blossom|sakura|cherry tree
Lucky plant with four leaves|four leaf clover|clover
Ireland's three-leafed symbol|shamrock|clover
The leaf on Canada's flag|maple|maple leaf|maple tree
Plant that snaps shut on flies|venus flytrap|flytrap|fly trap
Holland's most famous flower|tulip
Purple flower known for its calming scent|lavender
"Loves me, loves me not" flower|daisy
Climbing plant that covers old brick walls|ivy
Gel plant used to soothe sunburn|aloe vera|aloe
Acorns grow on this tree|oak|oak tree
Coconuts grow on this tree|palm|palm tree|coconut palm|coconut tree
Herb that's the base of pesto|basil
Herb that sounds like a word for time|thyme
Herb crushed into a mojito|mint|peppermint|spearmint
Plant that stings when you touch it|nettle|stinging nettle
Weed with fluffy seeds you blow on|dandelion
Sacred water flower of India|lotus|water lily
World's tallest trees, in California|redwood|sequoia|giant sequoia
African tree with a huge water-storing trunk|baobab
Trumpet-shaped yellow spring flower|daffodil
Vanilla comes from this flower|orchid|vanilla orchid
Chocolate comes from this plant|cacao|cocoa|cacao tree|cocoa tree
Tall grass that sugar is made from|sugar cane|sugarcane
Smelly bulb said to scare off vampires|garlic
Tree whose branches droop into rivers|willow|weeping willow
Tree that turns Brisbane streets purple in spring|jacaranda
NSW floral emblem with a big red flower|waratah
Aussie shrub with red flowers like a cleaning brush|bottlebrush|callistemon
Red-leafed plant sold at Christmas|poinsettia
Kiss under it at Christmas|mistletoe
Spiky Christmas leaves with red berries|holly
Plant whose fluffy fibres make T-shirts|cotton
Wine is made from the fruit of this plant|grapevine|grape|vine|grapes
Plant with white bark, common in Europe|birch|silver birch
Flower used in Hawaiian leis|hibiscus|plumeria|frangipani|orchid
Cones and needles, green all year|pine|pine tree|fir|spruce|conifer
Seaweed-like plant that floats on ponds|duckweed|algae|lily pad|water lily
Fungus with a cap and stalk|mushroom|toadstool
Green plant that grows on shady rocks and logs|moss
Feathery plant with fronds that never flowers|fern
Big yellow flower and Kansas state flower|sunflower
Plant famous for growing to the sky in a fairytale|beanstalk|bean|bean stalk`},
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
{id:"people",name:"Jobs & Costumes",kind:"emoji",hint:"Name the job or character",icon:"🧑‍🚀",d:`🧑‍🚒|firefighter|fireman|firie|fire fighter
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
🌍|earth|world|globe|planet|planet earth
☄️|comet|meteor|asteroid|shooting star
🪐|saturn|planet
💧|water drop|droplet|raindrop|water|drop|tear
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
{id:"landmarks",name:"Landmarks",kind:"text",hint:"Where is it?",icon:"🗼",d:`Eiffel Tower|paris
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
Burj Al Arab|dubai
Uluru|northern territory|uluru|alice springs|nt
The Twelve Apostles (Victoria)|victoria|great ocean road|vic
Great Barrier Reef|queensland|qld|cairns|great barrier reef`},
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
{id:"actors",name:"Famous Actors",kind:"photo",hint:"Name the actor",icon:"",d:`Tom Hanks|tom hanks|hanks
Tom Cruise|tom cruise|cruise
Brad Pitt|brad pitt|pitt
Leonardo DiCaprio|leonardo dicaprio|dicaprio|leo
Johnny Depp|johnny depp|depp
Robert Downey Jr.|robert downey jr|robert downey|downey|rdj
Chris Hemsworth|chris hemsworth|hemsworth
Hugh Jackman|hugh jackman|jackman
Russell Crowe|russell crowe|crowe
Heath Ledger|heath ledger|ledger
Will Smith|will smith
Denzel Washington|denzel washington|denzel|washington
Morgan Freeman|morgan freeman|freeman
Samuel L. Jackson|samuel l jackson|samuel jackson|samuel l. jackson
Keanu Reeves|keanu reeves|keanu|reeves
Arnold Schwarzenegger|arnold schwarzenegger|schwarzenegger|arnie
Sylvester Stallone|sylvester stallone|stallone|sly
Harrison Ford|harrison ford
Jack Nicholson|jack nicholson|nicholson
Al Pacino|al pacino|pacino
Robert De Niro|robert de niro|de niro|deniro
Clint Eastwood|clint eastwood|eastwood
Anthony Hopkins|anthony hopkins|hopkins
Ian McKellen|ian mckellen|mckellen
Daniel Radcliffe|daniel radcliffe|radcliffe
Daniel Craig|daniel craig
Christian Bale|christian bale|bale
Matt Damon|matt damon|damon
Ben Affleck|ben affleck|affleck
George Clooney|george clooney|clooney
Ryan Reynolds|ryan reynolds|reynolds
Ryan Gosling|ryan gosling|gosling
Dwayne Johnson|dwayne johnson|the rock|rock
Jim Carrey|jim carrey|carrey
Robin Williams|robin williams
Eddie Murphy|eddie murphy
Adam Sandler|adam sandler|sandler
Ben Stiller|ben stiller|stiller
Mel Gibson|mel gibson
Joaquin Phoenix|joaquin phoenix|phoenix
Timothée Chalamet|timothee chalamet|chalamet
Tom Holland|tom holland
Robert Pattinson|robert pattinson|pattinson
Zac Efron|zac efron|efron
Liam Neeson|liam neeson|neeson
Sean Connery|sean connery|connery
Nicole Kidman|nicole kidman|kidman
Margot Robbie|margot robbie|robbie
Cate Blanchett|cate blanchett|blanchett
Naomi Watts|naomi watts
Rebel Wilson|rebel wilson
Julia Roberts|julia roberts
Meryl Streep|meryl streep|streep
Angelina Jolie|angelina jolie|jolie
Jennifer Lawrence|jennifer lawrence
Jennifer Aniston|jennifer aniston|aniston
Scarlett Johansson|scarlett johansson|johansson
Emma Watson|emma watson
Emma Stone|emma stone
Anne Hathaway|anne hathaway|hathaway
Sandra Bullock|sandra bullock|bullock
Reese Witherspoon|reese witherspoon|witherspoon
Natalie Portman|natalie portman|portman
Kate Winslet|kate winslet|winslet
Audrey Hepburn|audrey hepburn|hepburn
Zendaya|zendaya
Halle Berry|halle berry
Charlize Theron|charlize theron|theron
Sigourney Weaver|sigourney weaver
Judi Dench|judi dench|dench
Helen Mirren|helen mirren|mirren
Lucy Liu|lucy liu
Cameron Diaz|cameron diaz|diaz
Drew Barrymore|drew barrymore|barrymore
Whoopi Goldberg|whoopi goldberg|whoopi|goldberg
Charlie Chaplin|charlie chaplin|chaplin
Rowan Atkinson|rowan atkinson|atkinson|mr bean`},
{id:"musicians",name:"Famous Musicians",kind:"photo",hint:"Who is it?",icon:"",d:`Taylor Swift|taylor swift|swift|taylor
Michael Jackson|michael jackson|mj|jackson
Beyoncé|beyonce|beyonce knowles
Kylie Minogue|kylie minogue|kylie|minogue
Ed Sheeran|ed sheeran|sheeran
Adele|adele
Lady Gaga|lady gaga|gaga
Rihanna|rihanna
Freddie Mercury|freddie mercury|mercury
John Lennon|john lennon|lennon
Elton John|elton john|elton
Dolly Parton|dolly parton|dolly
Elvis Presley|elvis presley|elvis|presley
Madonna (entertainer)|madonna
Prince (musician)|prince
Bob Dylan|bob dylan|dylan
David Bowie|david bowie|bowie
Bruce Springsteen|bruce springsteen|springsteen|the boss
Mick Jagger|mick jagger|jagger
Paul McCartney|paul mccartney|mccartney
Ringo Starr|ringo starr|ringo
Whitney Houston|whitney houston|whitney
Celine Dion|celine dion|dion
Shakira|shakira
Katy Perry|katy perry
Ariana Grande|ariana grande|ariana
Billie Eilish|billie eilish|eilish
Harry Styles|harry styles|styles
Justin Bieber|justin bieber|bieber
Bruno Mars|bruno mars
The Weeknd|the weeknd|weeknd
Eminem|eminem
Jay-Z|jay z|jay-z|jayz
Snoop Dogg|snoop dogg|snoop
Dua Lipa|dua lipa|dua
Olivia Rodrigo|olivia rodrigo|rodrigo
Sia (musician)|sia
Troye Sivan|troye sivan|troye
Delta Goodrem|delta goodrem|delta
Keith Urban|keith urban|urban
Jimmy Barnes|jimmy barnes|barnesy
John Farnham|john farnham|farnham
Nick Cave|nick cave
Johnny Cash|johnny cash|cash
Bob Marley|bob marley|marley
Stevie Wonder|stevie wonder
Tina Turner|tina turner
Cher|cher
Lizzo|lizzo
Post Malone|post malone
Ozzy Osbourne|ozzy osbourne|ozzy
Kanye West|kanye west|kanye|ye`},
{id:"sportstars",name:"Sports Stars",kind:"photo",hint:"Who is it?",icon:"",d:`Michael Jordan|michael jordan|jordan
LeBron James|lebron james|lebron
Kobe Bryant|kobe bryant|kobe
Stephen Curry|stephen curry|steph curry|curry
Cristiano Ronaldo|cristiano ronaldo|ronaldo
Lionel Messi|lionel messi|messi
David Beckham|david beckham|beckham
Neymar|neymar
Kylian Mbappé|kylian mbappe|mbappe
Sam Kerr|sam kerr|kerr
Usain Bolt|usain bolt|bolt
Cathy Freeman|cathy freeman|freeman
Ian Thorpe|ian thorpe|thorpe|thorpedo
Dawn Fraser|dawn fraser
Michael Phelps|michael phelps|phelps
Simone Biles|simone biles|biles
Serena Williams|serena williams|serena
Venus Williams|venus williams|venus
Roger Federer|roger federer|federer
Rafael Nadal|rafael nadal|nadal|rafa
Novak Djokovic|novak djokovic|djokovic|novak
Andy Murray|andy murray|murray
Ash Barty|ash barty|barty|ashleigh barty
Lleyton Hewitt|lleyton hewitt|hewitt
Nick Kyrgios|nick kyrgios|kyrgios
Shane Warne|shane warne|warne
Don Bradman|don bradman|bradman|donald bradman
Ricky Ponting|ricky ponting|ponting
Steve Smith (cricketer)|steve smith|smith
Pat Cummins|pat cummins|cummins
Virat Kohli|virat kohli|kohli
Sachin Tendulkar|sachin tendulkar|tendulkar|sachin
Ben Stokes|ben stokes|stokes
Tiger Woods|tiger woods|woods|tiger
Rory McIlroy|rory mcilroy|mcilroy
Greg Norman|greg norman|norman
Lewis Hamilton|lewis hamilton|hamilton
Max Verstappen|max verstappen|verstappen
Daniel Ricciardo|daniel ricciardo|ricciardo
Michael Schumacher|michael schumacher|schumacher
Muhammad Ali|muhammad ali|ali
Tom Brady|tom brady|brady
Patrick Mahomes|patrick mahomes|mahomes
Kelly Slater|kelly slater|slater
Lance Franklin|lance franklin|buddy franklin|buddy
Patty Mills|patty mills|mills`},
{id:"icons",name:"Icons & Leaders",kind:"photo",hint:"Who is it?",icon:"",d:`Albert Einstein|albert einstein|einstein
Marilyn Monroe|marilyn monroe|monroe|marilyn
Barack Obama|barack obama|obama
Donald Trump|donald trump|trump
Joe Biden|joe biden|biden
Elizabeth II|queen elizabeth|queen elizabeth ii|the queen|elizabeth
Charles III|king charles|king charles iii|charles
Diana, Princess of Wales|princess diana|diana|lady di
Prince William, Duke of Cambridge|prince william|william
Prince Harry, Duke of Sussex|prince harry|harry
Nelson Mandela|nelson mandela|mandela
Abraham Lincoln|abraham lincoln|lincoln|abe lincoln
Winston Churchill|winston churchill|churchill
Martin Luther King Jr.|martin luther king|martin luther king jr|mlk|king
Mahatma Gandhi|mahatma gandhi|gandhi
Napoleon|napoleon|napoleon bonaparte|bonaparte
Oprah Winfrey|oprah winfrey|oprah
Bill Gates|bill gates|gates
Steve Jobs|steve jobs|jobs
Elon Musk|elon musk|musk
Mark Zuckerberg|mark zuckerberg|zuckerberg|zuck
Jeff Bezos|jeff bezos|bezos
Stephen Hawking|stephen hawking|hawking
Charles Darwin|charles darwin|darwin
Isaac Newton|isaac newton|newton
Leonardo da Vinci|leonardo da vinci|da vinci|davinci|leonardo
Walt Disney|walt disney|disney
Mother Teresa|mother teresa|teresa
Pope Francis|pope francis|francis|the pope|pope
Neil Armstrong|neil armstrong|armstrong
Greta Thunberg|greta thunberg|thunberg|greta
David Attenborough|david attenborough|attenborough|sir david attenborough
Steve Irwin|steve irwin|irwin|crocodile hunter
Ned Kelly|ned kelly|kelly
Bob Hawke|bob hawke|hawke
John Howard|john howard|howard
Julia Gillard|julia gillard|gillard
Kevin Rudd|kevin rudd|rudd
Scott Morrison|scott morrison|morrison|scomo
Anthony Albanese|anthony albanese|albanese|albo
Jacinda Ardern|jacinda ardern|ardern|jacinda
Justin Trudeau|justin trudeau|trudeau
Emmanuel Macron|emmanuel macron|macron
Vladimir Putin|vladimir putin|putin`},
{id:"dogs",name:"Dog Breeds",kind:"photo",hint:"What breed?",icon:"",d:`Labrador Retriever|labrador|labrador retriever|lab
Golden Retriever|golden retriever|golden
German Shepherd|german shepherd|alsatian
Poodle|poodle
Bulldog|bulldog|english bulldog
French Bulldog|french bulldog|frenchie
Beagle|beagle
Rottweiler|rottweiler|rottie
Dachshund|dachshund|sausage dog
Pug|pug
Boxer (dog)|boxer
Border Collie|border collie|collie
Siberian Husky|husky|siberian husky
Chihuahua (dog)|chihuahua
Great Dane|great dane
Doberman Pinscher|doberman|dobermann|doberman pinscher
Cavalier King Charles Spaniel|cavalier|cavalier king charles spaniel|king charles spaniel
Shih Tzu|shih tzu
Pomeranian dog|pomeranian|pom
Australian Cattle Dog|cattle dog|blue heeler|australian cattle dog|heeler
Kelpie (dog)|kelpie|australian kelpie
Staffordshire Bull Terrier|staffy|staffordshire bull terrier|staffordshire terrier
Jack Russell Terrier|jack russell|jack russell terrier
Saint Bernard (dog)|saint bernard|st bernard
Dalmatian (dog)|dalmatian
Corgi|corgi|welsh corgi|pembroke welsh corgi
Greyhound|greyhound
Samoyed (dog)|samoyed
Akita (dog)|akita|akita inu
Shiba Inu|shiba inu|shiba
Bernese Mountain Dog|bernese mountain dog|bernese
Maltese dog|maltese
Yorkshire Terrier|yorkshire terrier|yorkie
Cocker Spaniel|cocker spaniel
Basset Hound|basset hound|basset
Bloodhound|bloodhound
Afghan Hound|afghan hound|afghan
Australian Shepherd|australian shepherd|aussie shepherd
Weimaraner|weimaraner
Border Terrier|border terrier`},
{id:"bugs",name:"Bugs & Insects",kind:"photo",hint:"Name the bug",icon:"",d:`Ant|ant
Honey bee|bee|honey bee|honeybee
Wasp|wasp
Housefly|fly|housefly|house fly
Mosquito|mosquito|mozzie
Ladybird|ladybird|ladybug|lady bug
Butterfly|butterfly
Moth|moth
Dragonfly|dragonfly
Grasshopper|grasshopper
Cricket (insect)|cricket
Cockroach|cockroach|roach
Beetle|beetle
Stag beetle|stag beetle
Praying mantis|praying mantis|mantis
Stick insect|stick insect
Caterpillar|caterpillar
Spider|spider
Scorpion|scorpion
Centipede|centipede
Millipede|millipede
Snail|snail
Earwig|earwig
Termite|termite
Flea|flea
Tick|tick
Firefly|firefly|glow worm
Cicada|cicada
Locust|locust
Dung beetle|dung beetle
Hornet|hornet
Bumblebee|bumblebee|bumble bee
Silverfish|silverfish
Louse|louse|head louse|lice
Aphid|aphid
Weevil|weevil
Crab spider|crab spider`},
{id:"fruitveg",name:"Fruit & Veg",kind:"photo",hint:"Name it",icon:"",d:`Apple|apple
Banana|banana
Orange (fruit)|orange
Strawberry|strawberry
Watermelon|watermelon
Pineapple|pineapple
Mango|mango
Grape|grape|grapes
Kiwifruit|kiwi|kiwifruit|kiwi fruit
Lemon|lemon
Lime (fruit)|lime
Pear|pear
Peach|peach
Cherry|cherry
Blueberry|blueberry
Raspberry|raspberry
Coconut|coconut
Avocado|avocado
Pomegranate|pomegranate
Passionfruit|passionfruit|passion fruit
Papaya|papaya|paw paw|pawpaw
Dragon fruit|dragon fruit|pitaya
Carrot|carrot
Broccoli|broccoli
Cauliflower|cauliflower
Potato|potato
Sweet potato|sweet potato
Tomato|tomato
Cucumber|cucumber
Capsicum|capsicum|bell pepper|pepper
Pumpkin|pumpkin
Corn on the cob|corn|sweetcorn|sweet corn
Onion|onion
Garlic|garlic
Mushroom|mushroom
Lettuce|lettuce
Cabbage|cabbage
Spinach|spinach
Celery|celery
Eggplant|eggplant|aubergine
Zucchini|zucchini|courgette
Beetroot|beetroot|beet
Radish|radish
Asparagus|asparagus
Brussels sprout|brussels sprout|brussels sprouts|sprout|sprouts
Peas|peas|pea|green peas
Chili pepper|chilli|chili|chilli pepper`},
{id:"gear",name:"Sports Equipment",kind:"photo",hint:"Name the equipment",icon:"",d:`Cricket bat|cricket bat|bat
Cricket ball|cricket ball
Tennis racket|tennis racket|racket|racquet|tennis racquet
Golf club|golf club|club|driver
Boxing glove|boxing glove|boxing gloves|glove
Baseball glove|baseball glove|mitt|catchers mitt
Baseball bat|baseball bat
Hockey stick|hockey stick|stick
Surfboard|surfboard|surf board|board
Skateboard|skateboard
Dumbbell|dumbbell|weight|dumbell
Bowling ball|bowling ball
Badminton racket|badminton racket
Shuttlecock|shuttlecock|birdie
Rugby ball|rugby ball
American football (ball)|american football|gridiron ball
Basketball (ball)|basketball
Volleyball (ball)|volleyball
Football (ball)|soccer ball|football
Table tennis|ping pong|table tennis|table tennis bat|ping pong paddle
Snooker|snooker cue|cue|pool cue
Archery|bow|bow and arrow|archery bow
Fishing rod|fishing rod|rod
Ice skates|ice skates|skates|ice skate
Roller skates|roller skates|rollerskates
Ski|skis|ski
Snowboard|snowboard
Kayak|kayak
Diving mask|snorkel|mask|diving mask|goggles
Javelin throw|javelin
Discus throw|discus
Rowing|oar|oars|paddle
Dartboard|dartboard|dart board|darts
Boomerang|boomerang
Bicycle helmet|helmet|bike helmet`},
{id:"cars",name:"Famous Cars",kind:"photo",hint:"Name the car",icon:"",d:`Ford Mustang|mustang|ford mustang
Volkswagen Beetle|beetle|vw beetle|volkswagen beetle
Mini (marque)|mini|mini cooper
Toyota Hilux|hilux|toyota hilux
Toyota Corolla|corolla|toyota corolla
Ford Falcon (Australia)|falcon|ford falcon
Holden Commodore|commodore|holden commodore
Holden Monaro|monaro|holden monaro
Jeep Wrangler|jeep wrangler|wrangler|jeep
Land Rover Defender|defender|land rover defender|land rover
Tesla Model S|tesla|tesla model s|model s
Porsche 911|porsche 911|911|porsche
Ferrari F40|ferrari f40|f40|ferrari
Lamborghini Countach|countach|lamborghini countach|lamborghini
Rolls-Royce Phantom|rolls royce|rolls-royce|rolls royce phantom
Bentley Continental GT|bentley
Aston Martin DB5|aston martin|db5|aston martin db5
Chevrolet Corvette|corvette|chevrolet corvette|chevy corvette
Chevrolet Camaro|camaro|chevrolet camaro|chevy camaro
Dodge Challenger|challenger|dodge challenger
Nissan Skyline GT-R|skyline|gtr|gt-r|nissan skyline
Mazda MX-5|mx5|mx-5|miata|mazda mx-5
Subaru Impreza WRX|wrx|subaru wrx|impreza|subaru
Mercedes-Benz G-Class|g wagon|g-wagon|g class|mercedes g wagon
Citroën 2CV|2cv|citroen 2cv
Fiat 500|fiat 500|fiat
DeLorean DMC-12|delorean|dmc-12
Volkswagen Kombi|kombi|volkswagen kombi|vw kombi|combi van
Ford Model T|model t|ford model t
Rolls-Royce Silver Ghost|silver ghost
Jaguar E-Type|e-type|jaguar e-type|e type|jaguar
BMW M3|bmw m3|m3|bmw
Audi R8|audi r8|r8|audi
Toyota Prius|prius|toyota prius
Isuzu D-Max|d-max|dmax|isuzu dmax
Ford Ranger|ford ranger|ranger
Toyota LandCruiser|landcruiser|land cruiser|toyota landcruiser`},
{id:"paintings",name:"Famous Paintings",kind:"photo",hint:"Name the painting",icon:"",d:`Mona Lisa|mona lisa
The Starry Night|starry night|the starry night
The Scream|the scream|scream
The Last Supper (Leonardo)|the last supper|last supper
Girl with a Pearl Earring|girl with a pearl earring|pearl earring
The Persistence of Memory|persistence of memory|the persistence of memory|melting clocks
The Birth of Venus|birth of venus|the birth of venus
Guernica (Picasso)|guernica
American Gothic|american gothic
The Kiss (Klimt)|the kiss|klimt the kiss
The Night Watch|the night watch|night watch
Las Meninas|las meninas
Impression, Sunrise|impression sunrise|impression, sunrise
Water Lilies|water lilies
The Great Wave off Kanagawa|great wave|the great wave|great wave off kanagawa
Sunflowers (Van Gogh series)|sunflowers
The Creation of Adam|creation of adam|the creation of adam
Whistler's Mother|whistlers mother|whistler's mother
Nighthawks (Hopper)|nighthawks
Café Terrace at Night|cafe terrace at night|cafe terrace
Liberty Leading the People|liberty leading the people
The Garden of Earthly Delights|garden of earthly delights|the garden of earthly delights
A Sunday Afternoon on the Island of La Grande Jatte|la grande jatte|sunday afternoon on the island of la grande jatte
The Son of Man|son of man|the son of man
Campbell's Soup Cans|campbells soup cans|campbell's soup cans|soup cans
Marilyn Diptych|marilyn diptych
Wanderer above the Sea of Fog|wanderer above the sea of fog
Lady with an Ermine|lady with an ermine
Self-Portrait with Bandaged Ear|self portrait with bandaged ear|bandaged ear
Vitruvian Man|vitruvian man
Washington Crossing the Delaware (painting)|washington crossing the delaware
School of Athens|school of athens|the school of athens
The Hay Wain|the hay wain|hay wain
The Blue Boy|the blue boy|blue boy
Dogs Playing Poker|dogs playing poker`},
{id:"instruments",name:"Musical Instruments",kind:"photo",hint:"Name the instrument",icon:"",d:`Acoustic guitar|guitar|acoustic guitar
Electric guitar|electric guitar
Bass guitar|bass guitar|bass
Piano|piano
Violin|violin|fiddle
Cello|cello
Double bass|double bass|upright bass
Viola|viola
Harp|harp
Flute|flute
Clarinet|clarinet
Oboe|oboe
Bassoon|bassoon
Saxophone|saxophone|sax
Trumpet|trumpet
Trombone|trombone
French horn|french horn|horn
Tuba|tuba
Drum kit|drum kit|drums|drum set
Snare drum|snare drum|snare
Xylophone|xylophone
Triangle (musical instrument)|triangle
Tambourine|tambourine
Maracas|maracas
Accordion|accordion
Harmonica|harmonica|mouth organ
Banjo|banjo
Ukulele|ukulele|uke
Mandolin|mandolin
Bagpipes|bagpipes|bagpipe
Didgeridoo|didgeridoo|didge
Organ (music)|organ|pipe organ
Recorder (musical instrument)|recorder
Cymbal|cymbal|cymbals
Bongo drum|bongo|bongos
Synthesizer|synthesizer|synth|keyboard
Sitar|sitar
Kazoo|kazoo
Castanets|castanets`},
{id:"dinos",name:"Dinosaurs & Prehistoric",kind:"photo",hint:"Name the creature",icon:"",d:`Tyrannosaurus|t rex|tyrannosaurus|tyrannosaurus rex|trex
Triceratops|triceratops
Stegosaurus|stegosaurus
Velociraptor|velociraptor|raptor
Brachiosaurus|brachiosaurus
Diplodocus|diplodocus
Spinosaurus|spinosaurus
Ankylosaurus|ankylosaurus
Pteranodon|pteranodon
Allosaurus|allosaurus
Parasaurolophus|parasaurolophus
Iguanodon|iguanodon
Apatosaurus|apatosaurus|brontosaurus
Pachycephalosaurus|pachycephalosaurus
Compsognathus|compsognathus
Dilophosaurus|dilophosaurus
Gallimimus|gallimimus
Carnotaurus|carnotaurus
Giganotosaurus|giganotosaurus
Plesiosaur|plesiosaur|plesiosaurus
Mosasaurus|mosasaurus
Archaeopteryx|archaeopteryx
Woolly mammoth|woolly mammoth|mammoth
Smilodon|sabre tooth tiger|saber tooth tiger|smilodon|sabre-toothed cat|saber-toothed cat|sabertooth
Megalodon|megalodon`},
{id:"wonders",name:"Natural Wonders",kind:"photo",hint:"Name the place",icon:"",d:`Uluru|uluru|ayers rock
Great Barrier Reef|great barrier reef
Grand Canyon|grand canyon
Mount Everest|everest|mount everest
Niagara Falls|niagara falls|niagara
Victoria Falls|victoria falls
Angel Falls|angel falls
Mount Fuji|mount fuji|fuji
Matterhorn|matterhorn
Mount Kilimanjaro|kilimanjaro|mount kilimanjaro
Aurora|aurora|northern lights|aurora borealis|southern lights
Dead Sea|dead sea
Giant's Causeway|giants causeway|giant's causeway
Ha Long Bay|ha long bay|halong bay
Amazon River|amazon|amazon river
Sahara|sahara|sahara desert
Yellowstone National Park|yellowstone
Yosemite National Park|yosemite
Zion National Park|zion
Antelope Canyon|antelope canyon
Great Blue Hole|great blue hole|blue hole
Mount Rushmore|mount rushmore|rushmore
Cliffs of Moher|cliffs of moher
Pamukkale|pamukkale
Plitvice Lakes National Park|plitvice lakes|plitvice
Iguazu Falls|iguazu falls|iguazu|iguacu falls
Mount Vesuvius|vesuvius|mount vesuvius
The Twelve Apostles (Victoria)|twelve apostles|12 apostles
Wave Rock|wave rock
Kata Tjuta|kata tjuta|the olgas|olgas
Bungle Bungle Range|bungle bungles|bungle bungle
Whitehaven Beach|whitehaven beach
Milford Sound|milford sound
Mount Cook|mount cook|aoraki
Lake Louise (Alberta)|lake louise
Fingal's Cave|fingals cave|fingal's cave`},
{id:"movietitle",name:"Finish the Movie Title",kind:"text",hint:"Fill in the blank",icon:"",d:`Finding ___|nemo
___ Park|jurassic
Toy ___|story
The Lion ___|king
Beauty and the ___|beast
The Wizard of ___|oz
Mary ___|poppins
The Sound of ___|music
Raiders of the Lost ___|ark
Back to the ___|future
Home ___|alone
The Silence of the ___|lambs
Saving Private ___|ryan
The Princess ___|bride
Mrs ___|doubtfire
Forrest ___|gump
Ferris Bueller's Day ___|off
The Godfather ___ II|part|part two
Edward ___hands|scissor
Lord of the ___|rings
Harry Potter and the ___ Stone|philosophers|philosopher's|sorcerers|sorcerer's
Pirates of the ___|caribbean
The Hunger ___|games
Star ___|wars
Monsters, ___|inc|incorporated
Mad Max: ___ Road|fury
Crocodile ___|dundee
The Great ___|gatsby
Pretty ___|woman
Top ___|gun
Breakfast at ___'s|tiffany|tiffanys
Dirty ___|dancing
Singin' in the ___|rain
Gone with the ___|wind
Planet of the ___|apes
Indiana Jones and the Temple of ___|doom
The Truman ___|show
Night at the ___|museum
Ice ___|age
Kung Fu ___|panda
How to Train Your ___|dragon
Charlie and the Chocolate ___|factory
Fast and ___|furious`},
{id:"songtitle",name:"Finish the Song Title",kind:"text",hint:"Fill in the blank",icon:"",d:`Bohemian ___|rhapsody
Hotel ___|california
Stairway to ___|heaven
Sweet Child O' ___|mine
Smells Like Teen ___|spirit
Billie ___|jean
Don't Stop ___|believin|believing|believin'
Livin' on a ___|prayer
We Will Rock ___|you
Another One Bites the ___|dust
Hey ___|jude
Let It ___|be
Yellow ___|submarine
Eye of the ___|tiger
Shake It ___|off
Girls Just Want to Have ___|fun
Wake Me Up Before You ___|go-go|go go|gogo
Take On ___|me
Dancing ___|queen
Rolling in the ___|deep
Shape of ___|you
Blinding ___|lights
Great Balls of ___|fire
Jailhouse ___|rock
Take Me Home, Country ___|roads
Sweet Home ___|alabama
Highway to ___|hell
Back in ___|black
Crazy Little Thing Called ___|love
Purple ___|rain
Material ___|girl
Single ___|ladies
Uptown ___|funk
Livin' la ___|loca`},
{id:"artists",name:"Who Sang It?",kind:"text",hint:"Name the artist",icon:"",d:`Bohemian Rhapsody|queen
Billie Jean|michael jackson|mj
Thriller|michael jackson|mj
Like a Prayer|madonna
Purple Rain|prince
Imagine|john lennon|lennon
Hey Jude|the beatles|beatles
Hotel California|eagles|the eagles
Stairway to Heaven|led zeppelin|zeppelin
Smells Like Teen Spirit|nirvana
Sweet Child O' Mine|guns n roses|guns n' roses|guns and roses
Livin' on a Prayer|bon jovi
Dancing Queen|abba
Rolling in the Deep|adele
Hello|adele
Shape of You|ed sheeran|sheeran
Shake It Off|taylor swift|taylor
Blank Space|taylor swift|taylor
Umbrella|rihanna
Single Ladies|beyonce|beyoncé
Bad Guy|billie eilish|eilish
Blinding Lights|the weeknd|weeknd
Uptown Funk|bruno mars|mark ronson
Poker Face|lady gaga|gaga
Firework|katy perry
Roar|katy perry
Toxic|britney spears|britney
Baby One More Time|britney spears|britney
Wannabe|spice girls|the spice girls
I Will Always Love You|whitney houston|dolly parton
My Heart Will Go On|celine dion
Waka Waka|shakira
Hips Don't Lie|shakira
Wonderwall|oasis
Yellow|coldplay
Viva la Vida|coldplay
Mr Brightside|the killers|killers
Seven Nation Army|the white stripes|white stripes
Back in Black|ac/dc|acdc|ac dc
Highway to Hell|ac/dc|acdc|ac dc
Down Under|men at work
You're the Voice|john farnham|farnham
Khe Sanh|cold chisel
Flame Trees|cold chisel
Treaty|yothu yindi
Dumb Things|paul kelly
Sweet Caroline|neil diamond
Jolene|dolly parton
Ring of Fire|johnny cash
Jailhouse Rock|elvis presley|elvis
Hound Dog|elvis presley|elvis
Superstition|stevie wonder
Respect|aretha franklin|aretha
Space Oddity|david bowie|bowie
Born in the U.S.A.|bruce springsteen|springsteen
Satisfaction|the rolling stones|rolling stones
Dont Stop Believin'|journey`},
{id:"pairs",name:"Famous Pairs",kind:"text",hint:"Fill in the blank",icon:"",d:`Batman and ___|robin
Salt and ___|pepper
Romeo and ___|juliet
Bonnie and ___|clyde
Tom and ___|jerry
Laurel and ___|hardy
Fish and ___|chips
Bread and ___|butter
Peanut butter and ___|jelly|jam
Rock and ___|roll
Pen and ___|paper
Mickey and ___|minnie
Fred and ___|ginger
Antony and ___|cleopatra
Adam and ___|eve
Sonny and ___|cher
Ant and ___|dec
Hall and ___|oates
Simon and ___|garfunkel
Starsky and ___|hutch
Thelma and ___|louise
Lady and the ___|tramp
Pinky and the ___|brain
Wallace and ___|gromit
Ben and ___|jerry
Cheech and ___|chong
Bert and ___|ernie
Beavis and ___|butthead|butt-head
Mario and ___|luigi
Sherlock Holmes and Doctor ___|watson
Hansel and ___|gretel
Jack and ___|jill
Punch and ___|judy
Mork and ___|mindy
Donny and ___|marie
Dolce and ___|gabbana
Marks and ___|spencer|spencers
Procter and ___|gamble
Lilo and ___|stitch
Gilbert and ___|sullivan`},
{id:"currencies",name:"Currencies",kind:"text",hint:"What currency?",icon:"",d:`Japan|yen
United Kingdom|pound|pound sterling|british pound|pounds
Europe|euro|euros
United States|dollar|us dollar|usd|american dollar
India|rupee|indian rupee
China|yuan|renminbi|rmb
Russia|rouble|ruble
Mexico|peso|mexican peso
Brazil|real|brazilian real
South Africa|rand
Switzerland|franc|swiss franc
Sweden|krona|swedish krona
Norway|krone|norwegian krone
Denmark|krone|danish krone
Poland|zloty|złoty
Thailand|baht
South Korea|won|korean won
Turkey|lira|turkish lira
Saudi Arabia|riyal|saudi riyal
Israel|shekel|new shekel
Nigeria|naira
Kenya|shilling|kenyan shilling
Vietnam|dong|đồng
Indonesia|rupiah
Malaysia|ringgit
Hungary|forint
Czech Republic|koruna|czech koruna
Peru|sol|nuevo sol
Bangladesh|taka
Cambodia|riel
Morocco|dirham
United Arab Emirates|dirham|uae dirham
Australia|australian dollar|dollar|aussie dollar
New Zealand|new zealand dollar|nz dollar|kiwi dollar|dollar
Canada|canadian dollar|dollar|loonie`},
{id:"foreign",name:"Translate It",kind:"text",hint:"What does it mean?",icon:"",d:`Gracias (Spanish)|thank you|thanks
Hola (Spanish)|hello|hi
Adiós (Spanish)|goodbye|bye
Por favor (Spanish)|please
Agua (Spanish)|water
Perro (Spanish)|dog
Gato (Spanish)|cat
Casa (Spanish)|house|home
Amigo (Spanish)|friend
Bonjour (French)|hello|good day|good morning
Merci (French)|thank you|thanks
Au revoir (French)|goodbye|bye
Chat (French)|cat
Chien (French)|dog
Pain (French)|bread
Fromage (French)|cheese
Pomme (French)|apple
Ciao (Italian)|hello|bye|goodbye
Grazie (Italian)|thank you|thanks
Buongiorno (Italian)|good morning|good day|hello
Arrivederci (Italian)|goodbye|see you later
Danke (German)|thank you|thanks
Guten Tag (German)|good day|hello|good afternoon
Auf Wiedersehen (German)|goodbye|bye
Ja (German)|yes
Nein (German)|no
Wasser (German)|water
Arigato (Japanese)|thank you|thanks
Konnichiwa (Japanese)|hello|good afternoon|good day
Sayonara (Japanese)|goodbye|farewell|bye
Sakura (Japanese)|cherry blossom|cherry blossoms
Ni hao (Mandarin)|hello|hi
Xie xie (Mandarin)|thank you|thanks
Namaste (Hindi)|hello|greetings|i bow to you
Aloha (Hawaiian)|hello|goodbye|love
Kia ora (Māori)|hello|hi|good health
Hakuna matata (Swahili)|no worries|no problem|no troubles
Sí (Spanish)|yes
Uno (Spanish)|one
Trois (French)|three
Otto (Italian)|eight
Cerveza (Spanish)|beer
Café (French)|coffee
Bambino (Italian)|baby|child`},
{id:"ausanimals",name:"Australian Animals",kind:"photo",hint:"Name the animal",icon:"🦘",d:`Red kangaroo|kangaroo|red kangaroo|roo
Koala|koala|koala bear
Platypus|platypus|duck billed platypus
Short-beaked echidna|echidna
Common wombat|wombat
Emu|emu
Laughing kookaburra|kookaburra
Tasmanian devil|tasmanian devil|tassie devil
Quokka|quokka
Dingo|dingo|wild dog
Southern cassowary|cassowary
Frill-necked lizard|frill necked lizard|frilled lizard|frill neck lizard|lizard
Thorny devil|thorny devil|thorny dragon|mountain devil
Sugar glider|sugar glider|glider|possum
Common brushtail possum|possum|brushtail possum
Red-necked wallaby|wallaby
Galah|galah
Sulphur-crested cockatoo|cockatoo|sulphur crested cockatoo
Superb lyrebird|lyrebird
Greater bilby|bilby
Numbat|numbat
Lumholtz's tree-kangaroo|tree kangaroo
Saltwater crocodile|crocodile|saltwater crocodile|saltie|croc
Redback spider|redback|redback spider
Sydney funnel-web spider|funnel web|funnel web spider
Blue-tongued skink|blue tongue|blue tongue lizard|blue tongued lizard|skink
Little penguin|little penguin|fairy penguin|penguin
Black swan|black swan|swan
Rainbow lorikeet|rainbow lorikeet|lorikeet
Australian magpie|magpie|maggie
Australian white ibis|ibis|bin chicken|white ibis
Lace monitor|goanna|lace monitor|monitor lizard
Eastern brown snake|brown snake|eastern brown snake|snake
Dugong|dugong|sea cow
Spotted-tailed quoll|quoll
Bandicoot|bandicoot
Inland taipan|taipan|inland taipan|snake
Huntsman spider|huntsman|huntsman spider
Box jellyfish|box jellyfish|jellyfish|stinger
Great white shark|great white|shark|great white shark
Wedge-tailed eagle|wedge tailed eagle|eagle|wedgie
Tawny frogmouth|tawny frogmouth|frogmouth|owl
Cane toad|cane toad|toad`},
{id:"christmas",name:"Christmas Songs",kind:"text",hint:"Finish the song title",icon:"🎄",d:`Jingle…|bells
Rudolph the Red-Nosed…|reindeer
Frosty the…|snowman
Silent…|night
Deck the…|halls
Let It…|snow
Feliz…|navidad
White…|christmas
Last…|christmas
Jingle Bell…|rock
Rockin' Around the Christmas…|tree
All I Want for Christmas Is…|you
Santa Claus Is Coming to…|town
Have Yourself a Merry Little…|christmas
Do They Know It's…|christmas|christmas time
Here Comes Santa…|claus
Winter…|wonderland
O Holy…|night
The Little Drummer…|boy
The Twelve Days of…|christmas
Joy to the…|world
O Come, All Ye…|faithful
Hark! The Herald Angels…|sing
We Wish You a Merry…|christmas
Away in a…|manger
Mary's Boy…|child
Blue…|christmas
It's Beginning to Look a Lot Like…|christmas
Driving Home for…|christmas
Merry Xmas…|everybody|everyone
Step into…|christmas
Wonderful…|christmastime|christmas time
Mistletoe and…|wine
I Saw Mommy Kissing Santa…|claus
Six White…|boomers
Christmas Where the Gum Trees…|grow
Baby, It's Cold…|outside
Sleigh…|ride
God Rest Ye Merry…|gentlemen
The First…|noel|nowell
Good King…|wenceslas
Grandma Got Run Over by a…|reindeer
Underneath the Christmas…|tree
Happy Xmas (War Is…)|over
Christmas…|wrapping|time|eve`},
{id:"halloween",name:"Halloween",kind:"mixed",hint:"Name the spooky thing",icon:"🎃",d:`🎃|jack o lantern|pumpkin|jack o' lantern
👻|ghost
🧛|vampire|dracula
🧟|zombie
🧙‍♀️|witch
💀|skull|skeleton
🦇|bat|vampire bat
🕷️|spider
🕸️|spider web|cobweb|web
🐈‍⬛|black cat|cat
🧌|troll|ogre
👹|ogre|demon|oni|monster
🤡|clown|scary clown
🐺|werewolf|wolf
😈|devil|demon|imp
👽|alien
⚰️|coffin|casket
🪦|gravestone|tombstone|headstone|grave
🔮|crystal ball|fortune teller
🍬|lolly|candy|sweets|lollies
🌕|full moon|moon
🦴|bone
🧪|potion|poison
🪄|magic wand|wand
🏚️|haunted house|house|old house
🐀|rat
🦉|owl
🧹|broomstick|broom
🎭|mask|masks
Count who lives in a castle in Transylvania|dracula|count dracula
Monster built by a scientist from body parts|frankenstein|frankensteins monster
Wrapped in bandages, from an Egyptian tomb|mummy|the mummy
Rider with no head from Sleepy Hollow|headless horseman
Hooded figure who carries a scythe|grim reaper|death|the reaper
Green witch from The Wizard of Oz|wicked witch|wicked witch of the west|elphaba
Wednesday's spooky family|addams family|the addams family|addams
Pumpkin King of Halloween Town|jack skellington|jack
The friendly ghost|casper
Green ghost in Ghostbusters who eats everything|slimer
What kids say at the door on Halloween|trick or treat`},
{id:"pokemon",name:"Pokémon",kind:"text",hint:"Name the Pokémon",icon:"⚡",d:`Electric mouse and Ash's best friend|pikachu
Fire lizard starter with a flame on its tail|charmander
Grass starter with a bulb on its back|bulbasaur
Water starter turtle|squirtle
Huge orange fire-breathing dragon|charizard
Pink balloon that sings you to sleep|jigglypuff
Giant sleepy Pokémon that blocks roads|snorlax
Psychic clone created in a lab|mewtwo
Tiny pink psychic Pokémon, ancestor of all|mew
Brown fox with many evolutions|eevee
Fish that can only splash around|magikarp
Fierce sea serpent that evolves from Magikarp|gyarados
Purple ghost with a huge grin|gengar
Team Rocket's talking cat|meowth
Giant rock snake|onix
Yellow duck with a constant headache|psyduck
Spoon-bending psychic Pokémon|alakazam|kadabra|abra
Four-armed fighting Pokémon|machamp|machoke|machop
Orange Pokémon that Pikachu evolves into|raichu
Baby Pokémon that evolves into Pikachu|pichu
Legendary ice bird|articuno
Legendary electric bird|zapdos
Legendary fire bird|moltres
Purple blob that can copy any Pokémon|ditto
Pink nurse helper with an egg|chansey|blissey
Ghost in a homemade Pikachu disguise|mimikyu
Owl grass starter from Alola|rowlet
Blue crocodile water starter|totodile
Blue jackal that reads auras|lucario
Green caterpillar that becomes Butterfree|caterpie
Looks just like a Poké Ball|voltorb|electrode
Floating rock with arms|geodude
Friendly orange dragon that evolves from Dragonair|dragonite
Big fire dog Pokémon|arcanine|growlithe
Gentle sea creature that ferries people across water|lapras
Electric sheep Pokémon|mareep|ampharos|flaaffy
Pikachu's Gen 3 lookalike cheerleaders|plusle and minun|plusle|minun
Pink fairy with a curly tail that loves the moon|clefairy|clefable
Bat Pokémon found in every cave|zubat|golbat
Mouse with a sandy shell that rolls into a ball|sandshrew|sandslash`},
{id:"videogames",name:"Video Games",kind:"text",hint:"Name it",icon:"🎮",d:`Plumber who rescues Princess Peach|mario|super mario
Mario's taller brother in green|luigi
Blue hedgehog who runs really fast|sonic|sonic the hedgehog
Hero in a green tunic in The Legend of Zelda|link
Yellow circle that eats dots and ghosts|pac man|pacman
Game where you build in a world of blocks|minecraft
Minecraft's green creature that explodes|creeper
Falling blocks puzzle game from Russia|tetris
Battle royale where you build forts|fortnite
Gorilla who throws barrels|donkey kong
Mario's green dinosaur friend|yoshi
Mario's spiky turtle enemy|bowser
Game where you catch creatures in balls|pokemon
Crime game series set in Los Santos|grand theft auto|gta
Birds launched at pigs with a slingshot|angry birds
Swipe to slice fruit with a blade|fruit ninja
Run from a guard along train tracks|subway surfers
Island life game with Tom Nook|animal crossing
Space soldier called Master Chief|halo
Life game where you control little people|the sims|sims
Sony's games console|playstation|ps5|ps4
Microsoft's games console|xbox
Nintendo console you can take on the go|switch|nintendo switch
Find the impostor among your crewmates|among us
Kart racing with banana peels and shells|mario kart
Shoot rows of aliens marching down the screen|space invaders
Bouncing ball and paddles, one of the first video games|pong
Pink puffball who inhales enemies|kirby
Frog crossing busy roads and rivers|frogger
Lara Croft's game series|tomb raider
EA's football game series|fifa|ea fc|ea sports fc
Online platform full of obbies|roblox
Nintendo fighting game where Mario fights Pikachu|super smash bros|smash bros|smash
Mario's greedy rival in yellow and purple|wario
Luigi hunts ghosts with a vacuum|luigis mansion
Fighting game famous for "Hadouken"|street fighter
Fighting game famous for "Finish him!"|mortal kombat
Orange bandicoot in jeans|crash|crash bandicoot
Purple dragon hero on PlayStation|spyro
Princess Mario keeps rescuing|peach|princess peach
Plumber series where the ghost Boo appears|mario|super mario`},
{id:"nba",name:"NBA",kind:"text",hint:"Name the team's city or the player",icon:"🏀",d:`Lakers|los angeles|la
Clippers|los angeles|la
Celtics|boston
Bulls|chicago
Warriors|golden state|san francisco
Knicks|new york
Nets|brooklyn|new york
Heat|miami
Spurs|san antonio
Mavericks|dallas
Rockets|houston
Suns|phoenix
Nuggets|denver
Jazz|utah|salt lake city
Bucks|milwaukee
76ers|philadelphia|philly
Raptors|toronto
Thunder|oklahoma city|oklahoma|okc
Trail Blazers|portland
Kings|sacramento
Timberwolves|minnesota
Pelicans|new orleans
Grizzlies|memphis
Hawks|atlanta
Hornets|charlotte
Magic|orlando
Pistons|detroit
Cavaliers|cleveland
Pacers|indiana|indianapolis
Wizards|washington
Bulls legend who wore number 23|michael jordan|jordan
Lakers legend who wore 8 and 24|kobe bryant|kobe
"King James"|lebron james|lebron
Warriors sharpshooter nicknamed "Chef"|stephen curry|steph curry|curry
"The Greek Freak"|giannis antetokounmpo|giannis
Aussie guard who won a title with the Spurs|patty mills|mills
Aussie centre drafted No. 1 in 2005|andrew bogut|bogut
Lakers giant centre called "Shaq"|shaquille oneal|shaq|oneal
Serbian Nuggets centre "The Joker"|nikola jokic|jokic
French giant nicknamed "Wemby"|victor wembanyama|wembanyama|wemby
Slovenian star "Luka Magic"|luka doncic|doncic|luka
Aussie point guard drafted first overall in 2016|ben simmons|simmons
Aussie guard drafted 6th by the Thunder in 2021|josh giddey|giddey`},
{id:"fastfood",name:"Fast Food",kind:"text",hint:"Name the chain or food",icon:"🍟",d:`The golden arches|mcdonalds|maccas
Home of the Whopper in Australia|hungry jacks|burger king
Colonel Sanders' fried chicken|kfc|kentucky fried chicken
Footlong subs made in front of you|subway
Pizza chain named after a tile game|dominos
Pizza chain with a red roof logo|pizza hut
Aussie chicken shop famous for rolls|red rooster
Peri-peri Portuguese chicken chain|nandos
Where you'd order a Big Mac|mcdonalds|maccas
Where you'd order a Zinger burger|kfc
Mexican chain famous for the Crunchwrap|taco bell
Coffee chain with a green mermaid logo|starbucks
Doughnut chain famous for the Original Glazed|krispy kreme
Ice cream chain famous for 31 flavours|baskin robbins
Aussie Mexican chain known as GYG|guzman y gomez|gyg
Gourmet burger chain with "Simply Grill'd"|grilld
Chicken chain famous for the Bondi burger|oporto
Smoothie and juice chain|boost|boost juice
Burger chain with a red-haired girl logo|wendys
Burger chain with free peanuts|five guys
Kids' meal with a toy at Maccas|happy meal
Chicken in a bucket|kfc
Louisiana fried chicken chain|popeyes
Schnitzel chain|schnitz
Aussie Mexican chain with "Meal for a Meal"|zambrero
Mall bakery chain famous for muffins|muffin break
Bite-sized chicken pieces at Maccas|chicken mcnuggets|mcnuggets|nuggets
Fried potato sticks|chips|fries|hot chips
Meat in pastry, the footy favourite|meat pie|pie
Wrap of shaved meat and garlic sauce|kebab|doner kebab|yiros|gyros
Chips, kebab meat and three sauces|halal snack pack|hsp|snack pack
Battered hot dog on a stick at the show|dagwood dog|corn dog|pluto pup
Sausage meat rolled in flaky pastry|sausage roll
Aussie Chinese takeaway dumpling|dim sim
Battered slice of potato from the fish and chip shop|potato cake|scallop|potato scallop
Fish and chips wrapped in this|paper|butcher's paper|newspaper
Burger, chips and a drink|combo|meal|value meal|meal deal
Frozen dessert at Wendy's|frosty
Maccas' soft serve with toppings stirred in|mcflurry`},
{id:"grocery",name:"Grocery Run",kind:"mixed",hint:"Name the grocery item",icon:"🛒",d:`🥛|milk
🧈|butter
🍞|bread|loaf
🥚|eggs|egg
🧀|cheese
🥫|tinned food|can|canned food|tin|soup|tin of soup
🧂|salt|salt shaker
🍯|honey
🫒|olives|olive
🍚|rice
🥣|cereal|bowl of cereal
🧻|toilet paper|toilet roll
🧴|shampoo|lotion|sunscreen|soap
🥓|bacon
🍌|bananas|banana
🥔|potatoes|potato|spuds
🧅|onions|onion
🥕|carrots|carrot
🫐|blueberries|blueberry
🥬|lettuce|cabbage|bok choy|greens
🫑|capsicum|bell pepper|pepper
🍅|tomatoes|tomato
🫘|beans|baked beans|kidney beans
🍪|biscuits|cookies|biscuit|cookie
🧃|juice|juice box|popper
☕|coffee
🍫|chocolate
Black yeast spread for toast|vegemite
Chocolate biscuit you do a Tim Tam slam with|tim tam|tim tams
Wheat biscuit breakfast cereal|weet bix|weetbix
Chocolate malt powder in a green tin|milo
Orange-flavoured chocolate balls|jaffas
Chocolate shaped like a frog|freddo|freddo frog
Lemon squash soft drink in a yellow can|solo
Supermarket with the "Down Down" ads|coles
"The fresh food people" supermarket|woolworths|woolies
German discount supermarket with a middle aisle|aldi
Sponge cake dipped in chocolate and coconut|lamington|lamingtons
Oat and golden syrup biscuit named after soldiers|anzac biscuit|anzac biscuits|anzacs
Sweet spread made from peanuts|peanut butter
Brown sauce you put on a pie|tomato sauce|sauce|ketchup
Sliced cheese that comes in plastic wrappers|cheese slices|kraft singles|singles
Little green frozen vegetables in a bag|peas
Fizzy water in a bottle|sparkling water|mineral water|soda water`},
{id:"bunnings",name:"Bunnings Run",kind:"mixed",hint:"Name the tool or item",icon:"🔨",d:`🔨|hammer
🪛|screwdriver
🔧|spanner|wrench
🪚|saw|hand saw|handsaw
⛏️|pick|pickaxe|mattock
🪓|axe|hatchet
🧰|toolbox|tool box|tool kit
🪜|ladder
🧱|brick|bricks
🪵|timber|wood|log|logs
🪣|bucket
🔩|nut and bolt|bolt|nut|screw
🧲|magnet
🔦|torch|flashlight
🪤|mouse trap|mousetrap|trap
🧯|fire extinguisher|extinguisher
🪴|pot plant|potted plant|plant
🪝|hook
🔌|plug|power plug
💡|light bulb|globe|bulb
🔒|padlock|lock
The famous fundraiser out the front on weekends|sausage sizzle|snag|sausage
Measures length and snaps back|tape measure|measuring tape
Tool with a bubble that shows if it's straight|spirit level|level
One-wheeled garden cart|wheelbarrow|barrow
Power tool that makes holes|drill|power drill
Paint tool that rolls|paint roller|roller
Water the garden with it|hose|garden hose
Rough paper for smoothing wood|sandpaper|sand paper
Gripping tool with two handles|pliers
Dig holes with it|shovel|spade
Gather fallen leaves with it|rake
Cuts the grass|lawn mower|mower|lawnmower
Trims the edges of the lawn|whipper snipper|line trimmer|trimmer|edger
Silver tape that fixes everything|duct tape|gaffer tape|gaffa tape
Glue that sets in seconds|super glue|superglue
Bathroom sealant in a tube|silicone|caulk|sealant
Long power cord|extension lead|extension cord|power board
Outdoor cooker Aussies love|barbecue|bbq|barbie
Bunnings: "Lowest prices are just the…"|beginning
Colour of a Bunnings team member's apron|green
Cuts through metal|hacksaw|angle grinder|grinder
Ratcheting tool for nuts and bolts|socket wrench|socket set|ratchet
Bar with a hooked end for prying|crowbar|pry bar|jemmy
Wooden or rubber hammer|mallet
Sharp flat blade for carving wood|chisel
Weed killer you spray|roundup|weed killer|herbicide
Bag of dirt for the garden|potting mix|soil|dirt|compost`},

{id:"times",name:"Times Tables",kind:"math",hint:"Quick, multiply",icon:"✖️"},
{id:"scramble",name:"Unscramble",kind:"tiles",hint:"Unscramble the word",icon:"🔤",words:"apple,beach,chair,dance,eagle,flame,grape,house,juice,knife,lemon/melon,mango,night/thing,ocean/canoe,piano,queen,river,snake,table/bleat,water,zebra,bread/beard,cloud,dream/armed,earth/heart,fruit,ghost,laugh,money,party,robot,smile/slime/miles/limes,tiger,train,watch,plant,sport/ports/strop,storm,candy,horse/shore,mouse,shark,clock,brain,phone,light,music,pizza,happy,funny,green,jelly,lucky,magic,noisy,pasta,quiet,sunny,teeth,uncle,video,woman,young"}
];
