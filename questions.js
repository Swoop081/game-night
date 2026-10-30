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
{id:"characters",name:"Movie Characters",kind:"text",hint:"Name the movie",icon:"🎞️",d:`Simba and Nala|the lion king|lion king
Darth Vader|star wars
Buzz Lightyear and Woody|toy story
Donkey and Princess Fiona|shrek
Elsa and Anna|frozen
Captain Jack Sparrow|pirates of the caribbean
Lieutenant Dan and Bubba|forrest gump
Hermione Granger|harry potter
Frodo Baggins|lord of the rings|the lord of the rings|the hobbit
Marty McFly and Doc Brown|back to the future
Kevin McCallister|home alone
Rocky Balboa|rocky|creed
Dorothy and Toto|the wizard of oz|wizard of oz
Nemo and Dory|finding nemo|finding dory
Jack and Rose|titanic
Neo and Trinity|the matrix|matrix
Lightning McQueen|cars
Mike and Sulley|monsters inc|monsters university
Remy the rat|ratatouille
Carl and Russell|up
Olaf the snowman|frozen
Maui|moana
Hiccup and Toothless|how to train your dragon
Baymax|big hero 6
Po the panda|kung fu panda
Gru and the Minions|despicable me|minions
Sid the sloth|ice age
Joy and Sadness|inside out
Miguel and Hector|coco
Judy Hopps and Nick Wilde|zootopia|zootropolis
Mr Incredible|the incredibles|incredibles
Ariel and Sebastian|the little mermaid|little mermaid
Belle and the Beast|beauty and the beast
Jasmine and the Genie|aladdin
Mowgli and Baloo|the jungle book|jungle book
Luke Skywalker|star wars
Tony Stark|iron man|the avengers|avengers
Katniss Everdeen|the hunger games|hunger games
Bella and Edward|twilight
Charlie Bucket|charlie and the chocolate factory|willy wonka|wonka
John McClane|die hard
Mick Dundee|crocodile dundee
Max Rockatansky|mad max|fury road
Farmer Hoggett|babe
Peter Venkman|ghostbusters
Ellen Ripley|alien|aliens
Sarah Connor|the terminator|terminator
Barbie and Ken|barbie
Shrek's ogre swamp neighbour Lord Farquaad|shrek
Woody and Jessie|toy story
Wall-E and Eve|wall e|walle
Tinker Bell|peter pan
Aragorn and Gandalf|lord of the rings|the lord of the rings|the hobbit
Ferris Bueller|ferris buellers day off|ferris bueller
Elle Woods|legally blonde
Mia Thermopolis|the princess diaries|princess diaries`},
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
{id:"faces",name:"Famous Faces",kind:"photo",hint:"Who is it?",icon:"🌟",d:`Taylor Swift|taylor swift|swift|taylor
Barack Obama|barack obama|obama
Albert Einstein|albert einstein|einstein
Marilyn Monroe|marilyn monroe|monroe|marilyn
Elvis Presley|elvis presley|elvis|presley
Michael Jackson|michael jackson|jackson
Beyoncé|beyonce|beyonce knowles
Kylie Minogue|kylie minogue|kylie|minogue
Steve Irwin|steve irwin|irwin|crocodile hunter
Cathy Freeman|cathy freeman|freeman
Shane Warne|shane warne|warne|warnie
Don Bradman|don bradman|bradman|the don
Ash Barty|ash barty|ashleigh barty|barty
Usain Bolt|usain bolt|bolt
Serena Williams|serena williams|serena
LeBron James|lebron james|lebron
Michael Jordan|michael jordan|jordan
Cristiano Ronaldo|cristiano ronaldo|ronaldo
Lionel Messi|lionel messi|messi
Elizabeth II|queen elizabeth|elizabeth|the queen|queen elizabeth the second
Charles III|king charles|charles|prince charles
Diana, Princess of Wales|princess diana|diana|lady di
Nelson Mandela|nelson mandela|mandela
Abraham Lincoln|abraham lincoln|lincoln
Ed Sheeran|ed sheeran|sheeran
Adele|adele
Lady Gaga|lady gaga|gaga
Rihanna|rihanna
Oprah Winfrey|oprah winfrey|oprah
Bill Gates|bill gates|gates
Steve Jobs|steve jobs|jobs
Freddie Mercury|freddie mercury|mercury
John Lennon|john lennon|lennon
Muhammad Ali|muhammad ali|ali
Roger Federer|roger federer|federer
Dolly Parton|dolly parton|dolly
Elton John|elton john|elton`},
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
{id:"auslandmarks",name:"Australian Landmarks",kind:"photo",hint:"Name the landmark",icon:"🏞️",d:`Sydney Opera House|opera house|sydney opera house
Sydney Harbour Bridge|harbour bridge|sydney harbour bridge|coathanger
Uluru|uluru|ayers rock
The Twelve Apostles (Victoria)|twelve apostles|12 apostles
Bondi Beach|bondi|bondi beach
Big Banana|big banana
Big Pineapple|big pineapple
Federation Square|federation square|fed square
Flinders Street railway station|flinders street station|flinders street
Melbourne Cricket Ground|mcg|melbourne cricket ground
Parliament House, Canberra|parliament house|parliament
Australian War Memorial|war memorial|australian war memorial
Kata Tjuta|kata tjuta|the olgas|olgas
Wave Rock|wave rock
Pinnacles Desert|pinnacles|the pinnacles|pinnacles desert
Port Arthur, Tasmania|port arthur
Cradle Mountain|cradle mountain
Wineglass Bay|wineglass bay
Whitehaven Beach|whitehaven beach|whitehaven
Shrine of Remembrance|shrine of remembrance|the shrine
Story Bridge|story bridge
Q1 (building)|q1|q1 tower
Sydney Tower|sydney tower|centrepoint tower|centrepoint
Luna Park Sydney|luna park
Three Sisters (Australia)|three sisters
Purnululu National Park|bungle bungles|bungle bungle|purnululu
Daintree Rainforest|daintree|daintree rainforest
Lake Hillier|lake hillier|pink lake
Hosier Lane|hosier lane
Royal Exhibition Building|royal exhibition building|exhibition building
Big Merino|big merino|big sheep
Great Barrier Reef|great barrier reef|barrier reef|reef
Eureka Tower|eureka tower|eureka
Fremantle Prison|fremantle prison
Sovereign Hill|sovereign hill
Puffing Billy Railway|puffing billy
Great Ocean Road|great ocean road
Mount Kosciuszko|kosciuszko|mount kosciuszko|kosi
Kings Park, Western Australia|kings park
Big Prawn|big prawn`},
{id:"plots",name:"Famous Movies",kind:"text",hint:"Name the movie",icon:"🍿",d:`A shark terrorises a beach town|jaws
A ship hits an iceberg on its first voyage|titanic
Dinosaurs are brought back to life on an island|jurassic park|jurassic world
A boy wizard goes to Hogwarts|harry potter
Toys come to life when humans leave the room|toy story
A clownfish dad crosses the ocean to find his son|finding nemo
A lion cub runs away after his father dies|the lion king|lion king
A teenager travels back to 1955 in a DeLorean|back to the future
A boy left home alone at Christmas fights burglars|home alone
Hobbits travel to destroy a powerful ring|lord of the rings|the lord of the rings
A man runs across America and meets presidents|forrest gump
Hackers discover reality is a computer simulation|the matrix|matrix
A stranded alien wants to phone home|et|e t
Two royal sisters, one with ice powers|frozen
A green ogre rescues a princess for a lord|shrek
Five emotions live inside a girl's head|inside out
A rat dreams of being a chef in Paris|ratatouille
An old man flies his house away with balloons|up
A lonely robot cleans up a deserted Earth|wall e|walle
A Philadelphia boxer gets a shot at the title|rocky
Superheroes assemble to stop Thanos|avengers|the avengers|avengers endgame|infinity war
A farm pig wants to be a sheepdog|babe
A bushman from the outback visits New York|crocodile dundee
Teens are forced to fight in a televised arena|the hunger games|hunger games
A tornado sweeps a girl and her dog to a magical land|the wizard of oz|wizard of oz
A doll leaves her perfect pink world for the real one|barbie
Scientists start a ghost-catching business in New York|ghostbusters
A pirate chases his stolen ship, the Black Pearl|pirates of the caribbean
A cop fights terrorists at an office Christmas party|die hard
A mermaid trades her voice for legs|the little mermaid|little mermaid
A Polynesian girl sails to restore a stolen heart|moana
A family of superheroes hides their powers|the incredibles|incredibles
Astronauts travel through a wormhole to save humanity|interstellar
A dad hunts for a Turbo-Man toy on Christmas Eve|jingle all the way
A fake substitute teacher forms a kids' rock band|school of rock
A British spy with the code number 007|james bond|bond|skyfall|casino royale
A farm boy learns the Force to fight the Empire|star wars
A weatherman relives the same day over and over|groundhog day
An archaeologist races Nazis for the Ark of the Covenant|indiana jones|raiders of the lost ark
A cyborg is sent back in time to kill Sarah Connor|the terminator|terminator
A road warrior survives a desert wasteland|mad max|fury road
A golden ticket wins a tour of a chocolate factory|charlie and the chocolate factory|willy wonka|wonka
A Pixar car learns there's more to life than winning|cars
A Mexican boy visits the Land of the Dead|coco
A panda becomes a kung fu master|kung fu panda`},
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
