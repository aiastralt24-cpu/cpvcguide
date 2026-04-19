import { astralCpvcReference } from "@/lib/site-config";

export type ProgrammaticPageType = "product" | "state" | "city" | "locality";

export type ProgrammaticFaq = {
  question: string;
  answer: string;
};

export type ProgrammaticLink = {
  label: string;
  href: string;
};

export type ProgrammaticPage = {
  type: ProgrammaticPageType;
  slug: string;
  path: string;
  title: string;
  description: string;
  primaryQuery: string;
  directAnswer: string;
  indexable: boolean;
  qualityState: "publishable" | "indexable-ready";
  qualityScore: number;
  auditNotes: string[];
  updatedAt: string;
  facts: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
  faqs: ProgrammaticFaq[];
  relatedLinks: ProgrammaticLink[];
  breadcrumbs: ProgrammaticLink[];
};

type ProgrammaticPageDraft = Omit<ProgrammaticPage, "indexable" | "qualityState" | "qualityScore" | "auditNotes">;

type ProductSeed = {
  slug: string;
  label: string;
  intent: string;
  fit: string;
};

type StateSeed = {
  slug: string;
  name: string;
  region: string;
  context: string;
};

type CitySeed = {
  slug: string;
  name: string;
  state: string;
  buildingContext: string;
  waterContext: string;
};

type LocalitySeed = {
  city: string;
  citySlug: string;
  state: string;
  slug: string;
  name: string;
  context: string;
};

const updatedAt = "2026-04-19";

const productGuidanceBySlug: Record<string, { decision: string; checks: string; mistake: string }> = {
  "cpvc-pipes": {
    decision: "Use this page as the broad CPVC pipe overview for domestic hot and cold water lines, then move into size, fitting, temperature, and installation pages for project-specific decisions.",
    checks: "Check pipe series, markings, rated use, compatible fittings, support spacing, and whether the run includes heaters, long branches, or exposed sections.",
    mistake: "The common mistake is treating a pipe label as the whole system specification without checking fittings, support, solvent cement, and service conditions.",
  },
  "cpvc-fittings": {
    decision: "Use this page when the project depends on elbows, tees, couplers, unions, transition fittings, and fixture connections rather than straight pipe alone.",
    checks: "Check fitting compatibility, insertion depth, transition points, alignment, and whether threaded or metal transitions create extra stress.",
    mistake: "The common mistake is forcing misaligned fittings or overtightening transitions, which can create joint stress even when the pipe itself is suitable.",
  },
  "cpvc-hot-water-pipes": {
    decision: "Use this page for hot-water distribution decisions where temperature, heater outlet detail, pressure, and thermal movement matter more than a generic pipe-size answer.",
    checks: "Check expected water temperature, heater connection requirements, pressure, pipe support, expansion movement, and distance from high-heat sources.",
    mistake: "The common mistake is assuming every hot-water line is the same instead of checking whether the actual service stays within rated conditions.",
  },
  "cpvc-solvent-cement": {
    decision: "Use this page for joint quality, leak prevention, and installer discipline because solvent cement performance depends heavily on preparation and assembly.",
    checks: "Check square cutting, deburring, cleaning, cement compatibility, full insertion, hold time, curing time, and pressure testing sequence.",
    mistake: "The common mistake is calling solvent cement glue and rushing the joint before the material-specific joining process has set correctly.",
  },
  "cpvc-pipe-size-chart": {
    decision: "Use this page to frame sizing questions around fixture demand, run length, branch reduction, and available pressure rather than copying one universal size.",
    checks: "Check fixture count, simultaneous demand, pressure, pipe length, number of bends, branch layout, and whether the line serves one fixture or a group.",
    mistake: "The common mistake is reducing pipe too early in the layout and then blaming the material for low flow at fixtures.",
  },
  "cpvc-pressure-rating": {
    decision: "Use this page when the question is pressure, temperature, and derating rather than simple material selection.",
    checks: "Check rated pressure, operating temperature, pressure surges, support, fittings, and whether the line has pump or heater-related stress.",
    mistake: "The common mistake is quoting one pressure number without the temperature and service condition that makes the number meaningful.",
  },
  "cpvc-installation-guide": {
    decision: "Use this page for the field sequence: cutting, preparing, cementing, supporting, testing, and avoiding installation shortcuts.",
    checks: "Check tools, cut quality, joint preparation, support spacing, cure time, pressure testing, and protection from mechanical damage.",
    mistake: "The common mistake is treating installation as a minor step when most CPVC failures are tied to stress, bad joints, or poor support.",
  },
};

export const productSeeds: ProductSeed[] = [
  { slug: "cpvc-pipes", label: "CPVC pipes", intent: "hot and cold water plumbing", fit: "new home, apartment, villa, and renovation plumbing lines" },
  { slug: "cpvc-fittings", label: "CPVC fittings", intent: "pipe direction changes and fixture connections", fit: "elbows, tees, couplers, unions, transition points, and branch lines" },
  { slug: "cpvc-hot-water-pipes", label: "CPVC hot water pipes", intent: "domestic hot-water distribution", fit: "bathrooms, kitchens, geyser-fed lines, and mixed-use plumbing runs" },
  { slug: "cpvc-plumbing-system", label: "CPVC plumbing system", intent: "complete residential water supply planning", fit: "pipe, fitting, solvent cement, support, and installation decisions together" },
  { slug: "cpvc-pro-pipes", label: "CPVC Pro pipes", intent: "manufacturer-side product comparison", fit: "buyers comparing CPVC product families before selection" },
  { slug: "cpvc-solvent-cement", label: "CPVC solvent cement", intent: "joint preparation and joining quality", fit: "installer-facing joint assembly, leak prevention, and curing discipline" },
  { slug: "cpvc-pipe-size-chart", label: "CPVC pipe size chart", intent: "sizing and fixture load planning", fit: "homes, apartments, risers, branch lines, and fixture groups" },
  { slug: "cpvc-pressure-rating", label: "CPVC pressure rating", intent: "temperature and pressure checks", fit: "engineering review before hot-water or high-demand use" },
  { slug: "cpvc-installation-guide", label: "CPVC installation guide", intent: "field installation sequence", fit: "cutting, deburring, cementing, support spacing, testing, and mistakes" },
  { slug: "cpvc-vs-pvc", label: "CPVC vs PVC", intent: "material selection", fit: "hot-water vs non-hot-water pipe decisions" },
  { slug: "cpvc-vs-upvc", label: "CPVC vs uPVC", intent: "domestic plumbing comparison", fit: "hot and cold water service decisions" },
  { slug: "cpvc-vs-ppr", label: "CPVC vs PPR", intent: "installer and joining-method comparison", fit: "project teams comparing solvent cement and heat-fusion workflows" },
  { slug: "cpvc-vs-copper", label: "CPVC vs copper", intent: "metal vs polymer pipe comparison", fit: "corrosion, installation, cost, and project preference discussions" },
  { slug: "cpvc-vs-gi-pipe", label: "CPVC vs GI pipe", intent: "corrosion and installation comparison", fit: "replacement and new domestic water line planning" },
  { slug: "cpvc-pipe-for-bathroom", label: "CPVC pipe for bathroom", intent: "bathroom plumbing selection", fit: "hot and cold bathroom supply lines" },
  { slug: "cpvc-pipe-for-kitchen", label: "CPVC pipe for kitchen", intent: "kitchen plumbing selection", fit: "sink, utility, and hot-water kitchen supply lines" },
  { slug: "cpvc-pipe-for-geyser", label: "CPVC pipe for geyser", intent: "water heater connection context", fit: "geyser-fed hot-water lines with correct transition details" },
  { slug: "cpvc-pipe-for-apartments", label: "CPVC pipe for apartments", intent: "multi-unit residential plumbing", fit: "branch lines, risers, renovation runs, and service shafts" },
  { slug: "cpvc-pipe-for-villas", label: "CPVC pipe for villas", intent: "independent house plumbing", fit: "bathrooms, kitchens, terraces, and long domestic runs" },
  { slug: "cpvc-pipe-for-commercial-buildings", label: "CPVC pipe for commercial buildings", intent: "light commercial water supply", fit: "office, retail, hospitality, and institutional water lines" },
  { slug: "cpvc-pipe-standards", label: "CPVC pipe standards", intent: "standards and compliance review", fit: "buyers checking markings, specifications, and document references" },
  { slug: "cpvc-pipe-lifespan", label: "CPVC pipe lifespan", intent: "service life expectations", fit: "maintenance, replacement, and long-term ownership questions" },
  { slug: "cpvc-pipe-price-context", label: "CPVC pipe price context", intent: "cost planning without fake pricing", fit: "project estimates where size, fittings, and site conditions change cost" },
  { slug: "cpvc-pipe-for-hard-water", label: "CPVC pipe for hard water", intent: "water-condition decision support", fit: "cities where scaling and mineral content shape plumbing discussions" },
  { slug: "cpvc-pipe-for-high-rise-buildings", label: "CPVC pipe for high-rise buildings", intent: "vertical building plumbing context", fit: "apartments, risers, pressure zones, and support planning" },
  { slug: "cpvc-pipe-repair-guide", label: "CPVC pipe repair guide", intent: "leak and damage response", fit: "repair decisions before cutting, replacing, or rejoining CPVC lines" },
  { slug: "cpvc-pipe-jointing-guide", label: "CPVC pipe jointing guide", intent: "joint quality and leak prevention", fit: "installer training and site supervision" },
  { slug: "cpvc-pipe-support-spacing", label: "CPVC pipe support spacing", intent: "support and sag prevention", fit: "horizontal and vertical CPVC runs" },
  { slug: "cpvc-pipe-temperature-limit", label: "CPVC pipe temperature limit", intent: "safe hot-water operating context", fit: "domestic hot-water applications and derating checks" },
  { slug: "cpvc-pipe-buying-guide", label: "CPVC pipe buying guide", intent: "product selection and procurement", fit: "contractors, homeowners, and project buyers comparing CPVC options" },
];

export const stateSeeds: StateSeed[] = [
  ["andhra-pradesh", "Andhra Pradesh", "South India", "hot-weather cities, coastal humidity, and fast-growing apartment construction"],
  ["arunachal-pradesh", "Arunachal Pradesh", "North East India", "hilly terrain, smaller urban clusters, and varied temperature conditions"],
  ["assam", "Assam", "North East India", "humid climate, rainfall, and mixed urban-rural water supply needs"],
  ["bihar", "Bihar", "East India", "dense towns, renovation demand, and residential water-line upgrades"],
  ["chhattisgarh", "Chhattisgarh", "Central India", "expanding cities, independent homes, and industrial-town housing"],
  ["goa", "Goa", "West Coast India", "coastal homes, hospitality plumbing, and humidity-sensitive installation planning"],
  ["gujarat", "Gujarat", "West India", "hard-water discussions, apartment growth, and commercial building demand"],
  ["haryana", "Haryana", "North India", "NCR expansion, plotted housing, and apartment plumbing upgrades"],
  ["himachal-pradesh", "Himachal Pradesh", "North India", "hill-town plumbing, temperature variation, and careful support planning"],
  ["jharkhand", "Jharkhand", "East India", "mining towns, urban housing, and renovation-led water-line work"],
  ["karnataka", "Karnataka", "South India", "apartment corridors, tech-city housing, and hot-water plumbing demand"],
  ["kerala", "Kerala", "South India", "humid climate, independent homes, and renovation-friendly plumbing choices"],
  ["madhya-pradesh", "Madhya Pradesh", "Central India", "large inland cities, plotted homes, and mixed water-pressure conditions"],
  ["maharashtra", "Maharashtra", "West India", "metro apartments, redevelopment, coastal humidity, and high project volume"],
  ["manipur", "Manipur", "North East India", "urbanizing hill-city housing and compact residential plumbing needs"],
  ["meghalaya", "Meghalaya", "North East India", "rainfall-heavy conditions, hill settlements, and careful exposed-run planning"],
  ["mizoram", "Mizoram", "North East India", "hill housing, compact water systems, and local installation constraints"],
  ["nagaland", "Nagaland", "North East India", "hill-town plumbing and smaller project procurement"],
  ["odisha", "Odisha", "East Coast India", "coastal climate, industrial-town housing, and public/private building growth"],
  ["punjab", "Punjab", "North India", "independent homes, renovation work, and domestic hot-water plumbing demand"],
  ["rajasthan", "Rajasthan", "West India", "hot climate, hard-water conversations, and independent housing"],
  ["sikkim", "Sikkim", "North East India", "hill-town conditions and temperature-sensitive installation planning"],
  ["tamil-nadu", "Tamil Nadu", "South India", "hot climate, apartment growth, and strong urban plumbing demand"],
  ["telangana", "Telangana", "South India", "Hyderabad-led apartment growth and mixed residential-commercial demand"],
  ["tripura", "Tripura", "North East India", "humid climate, compact cities, and residential upgrades"],
  ["uttar-pradesh", "Uttar Pradesh", "North India", "large city clusters, dense housing, and renovation demand"],
  ["uttarakhand", "Uttarakhand", "North India", "hill and plains mix, temperature variation, and careful material selection"],
  ["west-bengal", "West Bengal", "East India", "humid urban conditions, old-building renovation, and dense apartment plumbing"],
  ["delhi", "Delhi", "North India", "NCR redevelopment, apartments, builder floors, and renovation demand"],
  ["jammu-kashmir", "Jammu and Kashmir", "North India", "temperature variation and careful hot-water line planning"],
  ["ladakh", "Ladakh", "North India", "extreme temperature context where product selection needs site-specific review"],
  ["puducherry", "Puducherry", "South India", "coastal humidity and compact urban plumbing needs"],
  ["chandigarh", "Chandigarh", "North India", "planned-city housing, renovation, and residential water supply upgrades"],
  ["andaman-nicobar", "Andaman and Nicobar Islands", "Island India", "coastal corrosion discussions and humidity-heavy site context"],
  ["dadra-nagar-haveli-daman-diu", "Dadra and Nagar Haveli and Daman and Diu", "West India", "coastal and industrial-town plumbing demand"],
  ["lakshadweep", "Lakshadweep", "Island India", "island humidity and limited-site procurement context"],
].map(([slug, name, region, context]) => ({ slug, name, region, context }));

const citySource = `mumbai|Mumbai|Maharashtra|high-rise apartments, redevelopment projects, and compact renovation work|coastal humidity and mixed water pressure
delhi|Delhi|Delhi|builder floors, apartments, and large renovation projects|hard-water conversations and seasonal temperature variation
bengaluru|Bengaluru|Karnataka|tech-corridor apartments, villas, and gated communities|moderate climate with long domestic pipe runs
hyderabad|Hyderabad|Telangana|apartment towers, villas, and fast-growing suburbs|hard-water discussions and high hot-water demand
chennai|Chennai|Tamil Nadu|apartments, independent houses, and coastal construction|coastal humidity and hot climate
pune|Pune|Maharashtra|apartments, IT corridors, and independent housing|mixed elevation, redevelopment, and hot-water plumbing demand
ahmedabad|Ahmedabad|Gujarat|apartments, bungalows, and commercial interiors|hot climate and hard-water conversations
surat|Surat|Gujarat|apartments, textile-market buildings, and residential upgrades|humid conditions and high-use plumbing
jaipur|Jaipur|Rajasthan|independent homes, hotels, and apartment growth|hot climate and hard-water context
lucknow|Lucknow|Uttar Pradesh|apartments, plotted housing, and renovation work|large residential expansion and mixed pressure conditions
kanpur|Kanpur|Uttar Pradesh|older homes, commercial buildings, and upgrades|renovation-led water-line replacement
nagpur|Nagpur|Maharashtra|independent homes, apartments, and inland commercial demand|hot summers and long domestic runs
indore|Indore|Madhya Pradesh|apartments, colonies, and commercial interiors|inland climate and mixed water-pressure needs
thane|Thane|Maharashtra|high-rise residential clusters and redevelopment|metro apartment plumbing and hot-water demand
bhopal|Bhopal|Madhya Pradesh|plotted homes, apartments, and institutional buildings|inland residential water supply context
visakhapatnam|Visakhapatnam|Andhra Pradesh|coastal apartments, independent homes, and commercial sites|coastal humidity and exposed-run planning
patna|Patna|Bihar|dense housing, apartments, and renovation-led upgrades|high residential demand and mixed site conditions
vadodara|Vadodara|Gujarat|apartments, industrial-town housing, and bungalows|hot climate and hard-water discussions
ghaziabad|Ghaziabad|Uttar Pradesh|NCR apartments, builder floors, and redevelopment|renovation and pressure-zone planning
ludhiana|Ludhiana|Punjab|independent homes, industrial-town housing, and upgrades|domestic hot-water use and renovation context
agra|Agra|Uttar Pradesh|hotels, independent homes, and older-building upgrades|hard-water and renovation-led plumbing decisions
nashik|Nashik|Maharashtra|apartments, villas, and growing residential corridors|moderate climate with mixed water conditions
faridabad|Faridabad|Haryana|NCR apartments, builder floors, and industrial housing|hard-water context and renovation demand
meerut|Meerut|Uttar Pradesh|plotted homes, apartments, and commercial upgrades|dense residential water-line work
rajkot|Rajkot|Gujarat|apartments, bungalows, and commercial interiors|hot climate and hard-water conversations
varanasi|Varanasi|Uttar Pradesh|older homes, hotels, and dense urban plumbing|renovation-led water-line replacement
srinagar|Srinagar|Jammu and Kashmir|cold-weather homes, hotels, and compact water systems|temperature variation and hot-water planning
aurangabad|Aurangabad|Maharashtra|apartments, independent homes, and commercial projects|hot climate and mixed water pressure
dhanbad|Dhanbad|Jharkhand|industrial-town housing and residential upgrades|mining-town housing and renovation context
amritsar|Amritsar|Punjab|independent homes, hotels, and renovation projects|domestic hot-water demand and older-building upgrades
prayagraj|Prayagraj|Uttar Pradesh|apartments, institutions, and older homes|dense housing and mixed pressure conditions
ranchi|Ranchi|Jharkhand|apartments, plotted housing, and institutional buildings|plateau climate and residential expansion
coimbatore|Coimbatore|Tamil Nadu|apartments, villas, and commercial interiors|hot climate and mixed residential demand
jabalpur|Jabalpur|Madhya Pradesh|independent homes, apartments, and institutional projects|inland water-line planning
gwalior|Gwalior|Madhya Pradesh|independent homes, apartments, and older buildings|hot summers and renovation demand
vijayawada|Vijayawada|Andhra Pradesh|apartments, commercial interiors, and independent homes|hot climate and dense urban growth
jodhpur|Jodhpur|Rajasthan|independent homes, hotels, and hot-climate plumbing|hard-water and high-temperature context
madurai|Madurai|Tamil Nadu|independent homes, apartments, and commercial sites|hot climate and residential renovation
raipur|Raipur|Chhattisgarh|apartments, plotted housing, and commercial interiors|fast-growing inland city plumbing
kota|Kota|Rajasthan|hostels, apartments, and independent housing|hot climate and high-use water systems
guwahati|Guwahati|Assam|apartments, independent homes, and hilly-site projects|rainfall-heavy and humid conditions
chandigarh|Chandigarh|Chandigarh|planned housing, apartments, and renovation work|organized residential sectors and hot-water demand
solapur|Solapur|Maharashtra|independent homes, apartments, and commercial upgrades|hot inland climate
hubballi|Hubballi|Karnataka|apartments, independent homes, and trade-town buildings|mixed residential and commercial plumbing demand
tiruchirappalli|Tiruchirappalli|Tamil Nadu|apartments, homes, and institutional buildings|hot climate and domestic hot-water planning
bareilly|Bareilly|Uttar Pradesh|plotted homes, apartments, and renovation demand|dense residential water-line work
mysuru|Mysuru|Karnataka|independent homes, apartments, and hospitality projects|moderate climate and residential upgrades
tiruppur|Tiruppur|Tamil Nadu|industrial-town housing, apartments, and commercial sites|high-use plumbing in residential and work-linked buildings
gurugram|Gurugram|Haryana|high-rise apartments, offices, and premium housing|NCR pressure zones and hard-water conversations
aligarh|Aligarh|Uttar Pradesh|independent homes, apartments, and commercial buildings|renovation-led domestic plumbing
jalandhar|Jalandhar|Punjab|independent homes, apartments, and renovation work|domestic hot-water demand and plotted housing
bhubaneswar|Bhubaneswar|Odisha|apartments, institutions, and new residential sectors|humid climate and planned-city expansion
salem|Salem|Tamil Nadu|homes, apartments, and commercial interiors|hot climate and mixed water conditions
warangal|Warangal|Telangana|apartments, independent homes, and education-town housing|hot climate and growing residential demand
guntur|Guntur|Andhra Pradesh|apartments, homes, and commercial interiors|hot climate and domestic water supply growth
bhiwandi|Bhiwandi|Maharashtra|industrial housing, apartments, and renovation sites|high-use plumbing and redevelopment pressure
saharanpur|Saharanpur|Uttar Pradesh|independent homes, apartments, and older-building upgrades|renovation and dense housing context
gorakhpur|Gorakhpur|Uttar Pradesh|apartments, homes, and institutional buildings|growing city water-line demand
bikaner|Bikaner|Rajasthan|hot-climate homes, hotels, and independent housing|hard-water and high-temperature context
amravati|Amravati|Maharashtra|apartments, independent homes, and commercial interiors|hot climate and residential expansion
noida|Noida|Uttar Pradesh|high-rise apartments, offices, and gated housing|NCR hard-water and pressure-zone planning
jamshedpur|Jamshedpur|Jharkhand|industrial-town housing, apartments, and institutional projects|high-use domestic and commercial water lines
bhilai|Bhilai|Chhattisgarh|industrial-town housing, apartments, and renovation work|worker housing and residential upgrades
cuttack|Cuttack|Odisha|older homes, apartments, and commercial upgrades|humid climate and renovation-led plumbing
firozabad|Firozabad|Uttar Pradesh|independent homes, apartments, and commercial buildings|hot climate and dense residential plumbing
kochi|Kochi|Kerala|coastal apartments, villas, and hospitality projects|humidity and coastal corrosion discussions
nellore|Nellore|Andhra Pradesh|homes, apartments, and coastal commercial sites|hot and humid conditions
bhavnagar|Bhavnagar|Gujarat|coastal homes, apartments, and commercial buildings|humidity and hard-water discussions
dehradun|Dehradun|Uttarakhand|homes, apartments, and hill-plains housing|temperature variation and residential expansion
durgapur|Durgapur|West Bengal|industrial-town housing, apartments, and commercial upgrades|renovation and high-use plumbing
asansol|Asansol|West Bengal|industrial housing, apartments, and older-building upgrades|dense urban plumbing and renovation context
rourkela|Rourkela|Odisha|industrial-town housing and residential upgrades|high-use domestic water systems
nanded|Nanded|Maharashtra|independent homes, apartments, and commercial interiors|hot climate and residential growth
kolhapur|Kolhapur|Maharashtra|homes, apartments, and hospitality buildings|moderate climate and renovation demand
ajmer|Ajmer|Rajasthan|homes, hotels, and apartment growth|hot climate and hard-water planning
akola|Akola|Maharashtra|independent homes, apartments, and commercial buildings|hot inland climate
gulbarga|Kalaburagi|Karnataka|homes, apartments, and institutional projects|hot climate and residential expansion
jamnagar|Jamnagar|Gujarat|coastal homes, industrial housing, and apartments|humidity and hard-water discussions
ujjain|Ujjain|Madhya Pradesh|homes, hotels, and renovation projects|inland climate and older-building plumbing
loni|Loni|Uttar Pradesh|NCR residential expansion and builder floors|dense housing and renovation demand
siliguri|Siliguri|West Bengal|homes, apartments, and trade-city buildings|rainfall, humidity, and mixed site conditions
jhansi|Jhansi|Uttar Pradesh|independent homes, apartments, and older buildings|hot climate and renovation context
ulhasnagar|Ulhasnagar|Maharashtra|dense housing, apartments, and redevelopment sites|compact plumbing runs and high-use buildings
jammu|Jammu|Jammu and Kashmir|homes, hotels, and mixed climate projects|temperature variation and hot-water demand
sangli|Sangli|Maharashtra|homes, apartments, and commercial interiors|moderate climate and residential upgrades
mangalore|Mangaluru|Karnataka|coastal apartments, villas, and hospitality projects|humidity and exposed-run planning
erode|Erode|Tamil Nadu|industrial-town housing, homes, and apartments|hot climate and high-use plumbing
belagavi|Belagavi|Karnataka|homes, apartments, and commercial buildings|moderate climate and residential expansion
ambattur|Ambattur|Tamil Nadu|urban apartments, industrial housing, and renovation work|hot climate and high-use water systems
tirunelveli|Tirunelveli|Tamil Nadu|homes, apartments, and commercial interiors|hot climate and domestic water-line planning
malegaon|Malegaon|Maharashtra|dense housing, homes, and commercial upgrades|hot climate and renovation-led plumbing
gaya|Gaya|Bihar|homes, hotels, and apartment growth|hot climate and older-building upgrades
jalgaon|Jalgaon|Maharashtra|independent homes, apartments, and commercial interiors|hot climate and hard-water conversations
udaipur|Udaipur|Rajasthan|hotels, villas, and homes|hot climate, hospitality plumbing, and hard-water planning
maheshtala|Maheshtala|West Bengal|dense housing, apartments, and renovation sites|humid conditions and compact plumbing runs
davanagere|Davanagere|Karnataka|homes, apartments, and institutional buildings|hot climate and residential demand
kozhikode|Kozhikode|Kerala|coastal homes, apartments, and commercial projects|humidity and renovation-friendly plumbing
kurnool|Kurnool|Andhra Pradesh|homes, apartments, and commercial buildings|hot climate and domestic water-line growth
rajpur-sonarpur|Rajpur Sonarpur|West Bengal|suburban housing, apartments, and renovation work|humid conditions and compact residential plumbing
rajahmundry|Rajahmundry|Andhra Pradesh|homes, apartments, and commercial sites|hot and humid river-city conditions
bokaro|Bokaro|Jharkhand|industrial-town housing, apartments, and institutions|high-use plumbing and renovation context
south-dum-dum|South Dum Dum|West Bengal|dense apartments, older homes, and renovations|humid urban plumbing conditions
bellary|Ballari|Karnataka|homes, apartments, and industrial-town housing|hot climate and high-use water systems
patiala|Patiala|Punjab|independent homes, apartments, and institutions|domestic hot-water demand and renovation work
gopalpur|Gopalpur|West Bengal|suburban homes and apartments|humid conditions and residential growth
agartala|Agartala|Tripura|homes, apartments, and compact commercial buildings|humid climate and residential upgrades
bhagalpur|Bhagalpur|Bihar|dense homes, apartments, and commercial upgrades|renovation-led water-line work
muzaffarnagar|Muzaffarnagar|Uttar Pradesh|homes, apartments, and commercial buildings|dense residential plumbing and hot-water demand
bhatpara|Bhatpara|West Bengal|dense housing, apartments, and renovation sites|humid urban plumbing context
panihati|Panihati|West Bengal|apartments, older homes, and compact plumbing runs|humidity and dense residential upgrades
latur|Latur|Maharashtra|homes, apartments, and commercial interiors|hot climate and residential water planning
dhule|Dhule|Maharashtra|homes, apartments, and commercial buildings|hot inland climate and renovation demand
rohtak|Rohtak|Haryana|homes, apartments, and NCR-linked expansion|hard-water and residential upgrade context
korba|Korba|Chhattisgarh|industrial-town housing, apartments, and institutions|high-use residential plumbing
bilaspur|Bilaspur|Chhattisgarh|homes, apartments, and commercial buildings|inland climate and residential growth
shahjahanpur|Shahjahanpur|Uttar Pradesh|homes, apartments, and renovation projects|dense residential water-line demand
muzaffarpur|Muzaffarpur|Bihar|homes, apartments, and commercial upgrades|humid conditions and renovation-led plumbing
ahmednagar|Ahmednagar|Maharashtra|homes, apartments, and commercial interiors|hot climate and mixed water conditions
mathura|Mathura|Uttar Pradesh|homes, hotels, and older-building upgrades|hot climate and renovation demand
kollam|Kollam|Kerala|coastal homes, apartments, and hospitality sites|humidity and independent-house plumbing
avadi|Avadi|Tamil Nadu|suburban apartments, independent homes, and industrial housing|hot climate and long residential runs
kadapa|Kadapa|Andhra Pradesh|homes, apartments, and commercial interiors|hot climate and domestic water planning
kamarhati|Kamarhati|West Bengal|dense housing, apartments, and renovation sites|humid urban plumbing
bilaspur-hp|Bilaspur|Himachal Pradesh|hill-town homes and compact commercial buildings|temperature variation and support planning
shimla|Shimla|Himachal Pradesh|hill homes, hotels, and compact water systems|cold-weather planning and elevation changes
imphal|Imphal|Manipur|homes, apartments, and compact urban projects|rainfall and hill-valley plumbing context
shillong|Shillong|Meghalaya|hill homes, hotels, and compact water systems|rainfall-heavy and temperature-varied conditions
aizawl|Aizawl|Mizoram|hill homes and compact urban plumbing|terrain-sensitive installation planning
kohima|Kohima|Nagaland|hill-town homes and institutional buildings|temperature variation and compact water systems
itanagar|Itanagar|Arunachal Pradesh|homes, institutions, and hilly-site projects|rainfall and terrain-sensitive planning
gangtok|Gangtok|Sikkim|hill homes, hotels, and compact plumbing systems|cold-weather and elevation context
panaji|Panaji|Goa|coastal homes, apartments, and hospitality plumbing|humidity and corrosion discussions
puducherry|Puducherry|Puducherry|coastal homes, apartments, and compact urban projects|humidity and hot climate
port-blair|Port Blair|Andaman and Nicobar Islands|island homes, institutions, and hospitality sites|coastal humidity and procurement constraints
leh|Leh|Ladakh|cold-climate homes, hotels, and specialized site work|extreme temperature context requiring project-specific review`;

export const citySeeds: CitySeed[] = citySource.split("\n").map((line) => {
  const [slug, name, state, buildingContext, waterContext] = line.split("|");
  return { slug, name, state, buildingContext, waterContext };
});

export const localitySeeds: LocalitySeed[] = [
  ["mumbai", "Mumbai", "Maharashtra", "andheri", "Andheri", "dense apartments, offices, and redevelopment work"],
  ["mumbai", "Mumbai", "Maharashtra", "bandra", "Bandra", "premium homes, older buildings, and renovation-heavy plumbing"],
  ["mumbai", "Mumbai", "Maharashtra", "borivali", "Borivali", "suburban housing, apartments, and long domestic runs"],
  ["mumbai", "Mumbai", "Maharashtra", "powai", "Powai", "high-rise apartments and gated residential projects"],
  ["mumbai", "Mumbai", "Maharashtra", "thane-west", "Thane West", "large housing societies and redevelopment corridors"],
  ["delhi", "Delhi", "Delhi", "dwarka", "Dwarka", "planned sectors, apartments, and renovation work"],
  ["delhi", "Delhi", "Delhi", "rohini", "Rohini", "apartments, builder floors, and domestic hot-water demand"],
  ["delhi", "Delhi", "Delhi", "saket", "Saket", "builder floors, apartments, and premium renovations"],
  ["delhi", "Delhi", "Delhi", "lajpat-nagar", "Lajpat Nagar", "older homes, shops, and compact plumbing upgrades"],
  ["delhi", "Delhi", "Delhi", "janakpuri", "Janakpuri", "residential blocks and renovation-led pipe replacement"],
  ["bengaluru", "Bengaluru", "Karnataka", "whitefield", "Whitefield", "tech-corridor apartments and gated communities"],
  ["bengaluru", "Bengaluru", "Karnataka", "electronic-city", "Electronic City", "apartments, villas, and long plumbing runs"],
  ["bengaluru", "Bengaluru", "Karnataka", "koramangala", "Koramangala", "premium homes, restaurants, and renovation projects"],
  ["bengaluru", "Bengaluru", "Karnataka", "hebbal", "Hebbal", "high-rise apartments and airport-corridor housing"],
  ["bengaluru", "Bengaluru", "Karnataka", "jayanagar", "Jayanagar", "older homes, apartments, and renovation demand"],
  ["hyderabad", "Hyderabad", "Telangana", "gachibowli", "Gachibowli", "high-rise apartments and tech-corridor homes"],
  ["hyderabad", "Hyderabad", "Telangana", "hitech-city", "HITEC City", "offices, apartments, and premium housing"],
  ["hyderabad", "Hyderabad", "Telangana", "madhapur", "Madhapur", "urban apartments and commercial interiors"],
  ["hyderabad", "Hyderabad", "Telangana", "kukatpally", "Kukatpally", "dense apartments and renovation work"],
  ["hyderabad", "Hyderabad", "Telangana", "banjara-hills", "Banjara Hills", "premium homes, hotels, and renovation projects"],
  ["pune", "Pune", "Maharashtra", "hinjewadi", "Hinjewadi", "IT-corridor apartments, rentals, and gated housing"],
  ["pune", "Pune", "Maharashtra", "wakad", "Wakad", "new apartments and fast-growing residential projects"],
  ["pune", "Pune", "Maharashtra", "kharadi", "Kharadi", "tech-corridor apartments and commercial interiors"],
  ["pune", "Pune", "Maharashtra", "baner", "Baner", "premium apartments, villas, and renovation work"],
  ["pune", "Pune", "Maharashtra", "hadapsar", "Hadapsar", "apartments, industrial-linked housing, and long runs"],
  ["chennai", "Chennai", "Tamil Nadu", "anna-nagar", "Anna Nagar", "apartments, independent homes, and renovations"],
  ["chennai", "Chennai", "Tamil Nadu", "velachery", "Velachery", "dense apartments and hot-climate plumbing demand"],
  ["chennai", "Chennai", "Tamil Nadu", "omr", "OMR", "IT-corridor apartments and long domestic runs"],
  ["chennai", "Chennai", "Tamil Nadu", "tambaram", "Tambaram", "suburban homes, apartments, and renovations"],
  ["chennai", "Chennai", "Tamil Nadu", "adyar", "Adyar", "premium homes, coastal humidity, and older buildings"],
].map(([citySlug, city, state, slug, name, context]) => ({ citySlug, city, state, slug, name, context }));

function pageSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function productLinks() {
  return productSeeds.slice(0, 6).map((product) => ({
    label: product.label,
    href: `/products/${product.slug}`,
  }));
}

function duplicateCityNames() {
  const counts = new Map<string, number>();
  for (const city of citySeeds) {
    counts.set(city.name, (counts.get(city.name) ?? 0) + 1);
  }
  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([name]) => name));
}

function cityPageName(city: CitySeed) {
  return duplicateCityNames().has(city.name) ? `${city.name}, ${city.state}` : city.name;
}

function statePrimaryQuery(state: StateSeed) {
  if (["Delhi", "Chandigarh", "Puducherry"].includes(state.name)) {
    return `CPVC plumbing guide for ${state.name} region`;
  }

  return `CPVC plumbing guide for ${state.name}`;
}

function astralSection() {
  return {
    heading: "Where Astral CPVC Pro fits into the decision",
    body: `${astralCpvcReference.label} can be used as a manufacturer-side CPVC product reference while comparing pipe and fitting choices. Treat it as product context alongside the local installation conditions, not as a shortcut around sizing, support, joining, or pressure checks.`,
  };
}

function classifyContext(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes("coastal") || lower.includes("humidity") || lower.includes("humid")) {
    return {
      label: "Humidity and coastal context",
      note: "Moist or coastal conditions make corrosion-resistant product context useful, but exposed runs, supports, and installation protection still need project-level checks.",
    };
  }

  if (lower.includes("hard-water") || lower.includes("hard water")) {
    return {
      label: "Hard-water decision context",
      note: "Hard-water discussions should not be reduced to one material claim; buyers should still compare pipe rating, fittings, support, and water-heater conditions.",
    };
  }

  if (lower.includes("hill") || lower.includes("temperature variation") || lower.includes("cold")) {
    return {
      label: "Temperature-variation context",
      note: "Hill or cold-weather projects need careful routing, support, and hot-water planning rather than generic city-level product selection.",
    };
  }

  if (lower.includes("high-rise") || lower.includes("apartment") || lower.includes("apartments")) {
    return {
      label: "Apartment and pressure-zone context",
      note: "Apartment and high-rise projects should treat pressure zones, risers, branch lines, and fixture load as part of the CPVC decision.",
    };
  }

  if (lower.includes("renovation") || lower.includes("redevelopment") || lower.includes("older")) {
    return {
      label: "Renovation context",
      note: "Renovation projects need extra care around transitions, existing lines, access constraints, and joint quality.",
    };
  }

  return {
    label: "Local project context",
    note: "The page should be used to frame local plumbing questions before confirming product rating, pipe size, fittings, and installer capability.",
  };
}

function statePlanningProfile(state: StateSeed, stateCities: CitySeed[]) {
  const context = state.context.toLowerCase();
  const cityList = stateCities.map((city) => city.name).join(", ");
  const cityPhrase = cityList || "the main city and district clusters";

  if (context.includes("coastal") || context.includes("island") || context.includes("humidity") || context.includes("humid")) {
    return {
      planningLabel: `Coastal and humidity planning in ${state.name}`,
      planningBody: `${state.name} should be read through a humidity-first lens: exposed sections, shafts, terraces, and coastal building maintenance can matter as much as the pipe material. Use ${cityPhrase} to narrow the decision before checking CPVC size, support, and joining quality.`,
      riskLabel: "Main mistake to avoid",
      riskBody: "Do not turn coastal context into a simple material claim. The better check is whether the whole CPVC system is protected, supported, correctly joined, and suitable for the actual hot and cold water service.",
    };
  }

  if (context.includes("hill") || context.includes("temperature") || context.includes("cold") || context.includes("terrain")) {
    return {
      planningLabel: `Hill and temperature planning in ${state.name}`,
      planningBody: `${state.name} needs more caution around routing, exposed runs, support, and hot-water planning than a flat city checklist. Pages for ${cityPhrase} should help readers separate normal domestic plumbing from colder or terrain-sensitive site conditions.`,
      riskLabel: "Where generic CPVC advice becomes weak",
      riskBody: "A state-level answer is not enough for hill, cold, or terrain-sensitive projects. Confirm the service temperature, protection from exposure, support spacing, and whether the installer has handled similar local conditions.",
    };
  }

  if (context.includes("hard-water") || context.includes("hot climate") || context.includes("hot-weather")) {
    return {
      planningLabel: `Hot-climate and water-condition planning in ${state.name}`,
      planningBody: `${state.name} has CPVC demand shaped by heat, water-condition questions, and growing residential work. Use ${cityPhrase} for the local pattern, then check pressure, temperature, pipe size, and fitting compatibility instead of relying on one broad state answer.`,
      riskLabel: "Selection limit",
      riskBody: "Hard-water or hot-weather context can influence buying discussions, but it does not remove the need to verify product rating, heater details, installation support, and joint quality.",
    };
  }

  if (context.includes("industrial") || context.includes("commercial")) {
    return {
      planningLabel: `Industrial-town and commercial planning in ${state.name}`,
      planningBody: `${state.name} often needs CPVC guidance for worker housing, mixed-use buildings, institutions, and commercial interiors. City pages such as ${cityPhrase} should separate domestic hot-water lines from higher-use or non-domestic plumbing assumptions.`,
      riskLabel: "Use-case boundary",
      riskBody: "Do not assume a domestic CPVC guide covers every commercial or industrial site. Confirm whether the line is only for potable domestic water and whether pressure, temperature, and usage cycles are within the selected system's limits.",
    };
  }

  if (context.includes("redevelopment") || context.includes("renovation") || context.includes("old-building") || context.includes("dense")) {
    return {
      planningLabel: `Renovation-led planning in ${state.name}`,
      planningBody: `${state.name} has many CPVC decisions tied to replacements, builder floors, dense housing, and older lines. Use ${cityPhrase} to understand whether the project is a fresh installation, a partial replacement, or a transition from an existing material.`,
      riskLabel: "Transition mistake",
      riskBody: "Renovation projects fail when new pipe is selected without checking old-line transitions, access constraints, threaded connections, and whether existing pressure or heater conditions are suitable.",
    };
  }

  return {
    planningLabel: `Regional CPVC planning in ${state.name}`,
    planningBody: `${state.name} needs city-led CPVC guidance because ${state.context}. Start with ${cityPhrase}, then use product and installation pages to check size, pressure, fittings, support, and hot-water conditions.`,
    riskLabel: "State-page limit",
    riskBody: "A state page should guide the next question, not replace a project specification. Final selection still needs the exact building use case, water demand, pipe series, fittings, and installer discipline.",
  };
}

function cityPlanningProfile(city: CitySeed) {
  const text = `${city.buildingContext} ${city.waterContext}`.toLowerCase();

  if (text.includes("coastal") || text.includes("humidity") || text.includes("humid")) {
    return {
      type: "coastal",
      title: "Coastal-site selection lens",
      application: `In ${city.name}, CPVC is usually considered where bathrooms, kitchens, utility lines, and hospitality or apartment projects need hot and cold water distribution without turning the choice into a metal-versus-polymer slogan.`,
      risk: `The local watchpoint is moisture-heavy construction. Protect exposed runs, avoid unsupported terrace routing, and check that fittings, solvent cement, and supports suit the selected CPVC system.`,
      buying: `For ${city.name} buyers, product comparison should focus on rated CPVC pipe, matching fittings, installer familiarity, and whether the site has coastal exposure or compact shafts.`,
    };
  }

  if (text.includes("hill") || text.includes("cold") || text.includes("temperature variation") || text.includes("extreme temperature") || text.includes("elevation")) {
    return {
      type: "hill",
      title: "Hill or temperature-variation lens",
      application: `${city.name} needs CPVC decisions to account for compact routing, hotels or homes with hot-water demand, and site conditions that may be less forgiving than a standard plains-city apartment.`,
      risk: `The practical risk is treating a hill or cold-weather project like a generic city page. Check exposed sections, support, heater connections, and whether the installer understands local routing constraints.`,
      buying: `For ${city.name}, shortlist CPVC only after confirming the service temperature, pressure, pipe size, and joining conditions, especially where hot-water lines run through exposed or hard-to-access areas.`,
    };
  }

  if (text.includes("hard-water") || text.includes("hard water")) {
    return {
      type: "hard-water",
      title: "Hard-water and heat selection lens",
      application: `${city.name} CPVC decisions often begin with hot-water lines, apartments, bungalows, and renovation jobs where water-condition discussions influence the shortlist.`,
      risk: `Do not use hard-water context as a single yes-or-no answer. The field check is pipe rating, heater outlet detail, pressure, support spacing, and whether joints are made with compatible CPVC solvent cement.`,
      buying: `For ${city.name}, compare CPVC products by standards, fittings, sizes, and installer discipline before using brand context as a final tie-breaker.`,
    };
  }

  if (text.includes("high-rise") || text.includes("pressure-zone") || text.includes("apartments") || text.includes("apartment towers")) {
    return {
      type: "apartment",
      title: "Apartment and pressure-zone lens",
      application: `${city.name} commonly raises CPVC questions for branch lines, bathrooms, kitchens, shafts, risers, and renovation work inside multi-unit buildings.`,
      risk: `The risk is undersizing branches or ignoring pressure zones. CPVC selection should be checked against fixture load, bends, supports, heater connections, and whether fittings stay compatible through the full run.`,
      buying: `For ${city.name} apartment projects, the useful comparison is a complete pipe-and-fitting system, not only pipe price or a single brand name.`,
    };
  }

  if (text.includes("industrial") || text.includes("commercial") || text.includes("office") || text.includes("institution")) {
    return {
      type: "commercial",
      title: "High-use building lens",
      application: `${city.name} CPVC pages should separate domestic potable-water plumbing from high-use commercial or institutional assumptions, because the service pattern changes the checks.`,
      risk: `Do not stretch domestic CPVC guidance into every non-domestic application. Confirm pressure, temperature, usage cycles, pipe support, and whether the line is actually within the selected product's intended use.`,
      buying: `For ${city.name}, procurement should compare system completeness, availability of matching fittings, documentation, and installer experience on similar building types.`,
    };
  }

  if (text.includes("renovation") || text.includes("redevelopment") || text.includes("older") || text.includes("dense")) {
    return {
      type: "renovation",
      title: "Renovation and transition lens",
      application: `${city.name} often needs CPVC guidance for replacements, compact bathrooms, kitchen upgrades, and partial line changes rather than only new construction.`,
      risk: `The field mistake is joining new CPVC thinking to old-site assumptions. Check transitions, threaded connections, access, alignment, cure time, and whether existing heaters or pumps create stress.`,
      buying: `For ${city.name} renovations, choose pipe, fittings, and solvent cement as one system and ask the installer how they will handle transitions before buying material.`,
    };
  }

  if (text.includes("hot climate") || text.includes("hot summers") || text.includes("hot inland")) {
    return {
      type: "hot-climate",
      title: "Hot-climate domestic-water lens",
      application: `${city.name} CPVC choices often come from bathrooms, kitchens, villas, plotted homes, and hot-water distribution where heat and long domestic runs make planning important.`,
      risk: `Avoid assuming heat alone decides the material. Check operating temperature, pressure, support spacing, sunlight exposure, bend count, and compatibility of every fitting in the run.`,
      buying: `For ${city.name}, the better buying question is whether the selected CPVC system can be installed cleanly for the exact layout, not whether the city simply appears on a product page.`,
    };
  }

  return {
    type: "residential",
    title: "Residential project lens",
    application: `${city.name} CPVC guidance is most useful for homes, apartments, bathrooms, kitchens, and renovation runs where the reader needs a practical shortlist before speaking with an installer.`,
    risk: `The main risk is generic selection: choosing pipe by city name without checking size, pressure, temperature, fittings, support, and site access.`,
    buying: `For ${city.name}, compare CPVC by complete-system suitability, documentation, installer capability, and whether the use case is hot water, cold water, or both.`,
  };
}

function scorePage(page: ProgrammaticPageDraft) {
  let score = 0;
  const notes: string[] = [];
  const text = [page.directAnswer, ...page.sections.map((section) => `${section.heading} ${section.body}`), ...page.faqs.map((faq) => `${faq.question} ${faq.answer}`)].join(" ");
  const uniqueWords = new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? []);

  if (page.directAnswer.length >= 140) score += 12;
  else notes.push("Direct answer should be more decision-rich.");

  if (page.facts.length >= 3) score += 10;
  else notes.push("Decision snapshot needs at least 3 facts.");

  if (page.sections.length >= 4) score += 18;
  else notes.push("Page needs at least 4 content sections for stronger uniqueness.");

  if (page.faqs.length >= 2) score += 10;
  else notes.push("FAQ coverage is too thin.");

  if (page.relatedLinks.length >= 5) score += 12;
  else notes.push("Internal linking should include at least 5 useful links.");

  if (/Astral CPVC Pro/i.test(text)) score += 8;
  else notes.push("Missing neutral Astral CPVC Pro context.");

  if (/\b(limit|limits|avoid|do not|not as a shortcut|not as a substitute|check|depends)\b/i.test(text)) score += 12;
  else notes.push("Missing practical limits or caution language.");

  if (uniqueWords.size >= 85) score += 12;
  else notes.push("Text may be too repetitive or thin.");

  if (page.type === "locality" && /locality|local|around|near|city/i.test(text)) score += 6;
  else if (page.type !== "locality") score += 6;
  else notes.push("Locality page needs stronger local reason-to-exist.");

  return {
    score,
    notes: notes.length > 0 ? notes : ["Passed Stage 1 quality audit thresholds."],
  };
}

function finalizePage(page: ProgrammaticPageDraft): ProgrammaticPage {
  const audit = scorePage(page);

  return {
    ...page,
    qualityScore: audit.score,
    auditNotes: audit.notes,
    qualityState: audit.score >= 80 ? "indexable-ready" : "publishable",
    indexable: audit.score >= 80,
  };
}

function productGuidance(product: ProductSeed) {
  return (
    productGuidanceBySlug[product.slug] ?? {
      decision: `Use this page to decide whether ${product.label} match the application rather than treating the product category as a universal answer.`,
      checks: `Check how ${product.label} relate to pipe size, fittings, temperature, pressure, joining method, support spacing, and the actual building use case.`,
      mistake: `The common mistake is selecting ${product.label} by name alone without confirming the system details that make the choice safe and useful.`,
    }
  );
}

export function getProductPages(): ProgrammaticPage[] {
  return productSeeds.map((product) => {
    const guidance = productGuidance(product);
    return finalizePage({
      type: "product",
      slug: product.slug,
      path: `/products/${product.slug}`,
      title: `${product.label}: uses, limits, and CPVC selection guide`,
      description: `Understand where ${product.label} fit in CPVC plumbing, what to check before selection, and how to compare product context without relying on sales copy.`,
      primaryQuery: `${product.label} for plumbing`,
      directAnswer: `${product.label} are relevant when the project needs ${product.intent}. The right selection depends on temperature, pressure, pipe size, fittings, support, and installation quality.`,
      updatedAt,
      facts: [
        { label: "Primary use", value: product.intent },
        { label: "Best fit", value: product.fit },
        { label: "Check before use", value: "temperature, pressure, size, fittings, support" },
      ],
      sections: [
        {
          heading: `Decision role for ${product.label}`,
          body: guidance.decision,
        },
        {
          heading: "Checks before selection",
          body: guidance.checks,
        },
        {
          heading: "Limits and mistakes to avoid",
          body: guidance.mistake,
        },
        astralSection(),
      ],
      faqs: [
        {
          question: `Are ${product.label} suitable for hot water?`,
          answer: "CPVC is commonly used for domestic hot-water plumbing, but the suitability depends on the rated product, system pressure, heater connection details, and installation quality.",
        },
        {
          question: `Should I compare ${product.label} by brand only?`,
          answer: "No. Brand context helps, but the better comparison includes standards, pipe size, fittings, support, temperature, pressure, and installer capability.",
        },
      ],
      relatedLinks: [
        { label: "CPVC hot water guide", href: "/technical-guides/can-cpvc-handle-hot-water" },
        { label: "CPVC temperature limit", href: "/technical-guides/cpvc-temperature-limit" },
        { label: "CPVC installation guide", href: "/installation/how-to-join-cpvc-pipes" },
        { label: "CPVC support spacing", href: "/installation/cpvc-support-spacing" },
        { label: astralCpvcReference.label, href: astralCpvcReference.href },
      ],
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/cpvc-pipes" },
        { label: product.label, href: `/products/${product.slug}` },
      ],
    });
  });
}

export function getStatePages(): ProgrammaticPage[] {
  return stateSeeds.map((state) => {
    const stateCities = citySeeds.filter((city) => city.state === state.name).slice(0, 8);
    const stateProfile = statePlanningProfile(state, stateCities);
    return finalizePage({
      type: "state",
      slug: state.slug,
      path: `/state/${state.slug}`,
      title: `CPVC pipes in ${state.name}: city-wise plumbing guide`,
      description: `Plan CPVC plumbing decisions across ${state.name} with city links, hot-water context, and practical product-selection checks.`,
      primaryQuery: statePrimaryQuery(state),
      directAnswer: `CPVC pipes can fit many residential and light commercial plumbing projects in ${state.name}, especially where hot and cold water lines need corrosion-resistant product context. The right choice still depends on local building type, water conditions, and installation quality.`,
      updatedAt,
      facts: [
        { label: "Region", value: state.region },
        { label: "State context", value: state.context },
        { label: "Main check", value: "city use case, water conditions, and installation quality" },
      ],
      sections: [
        {
          heading: `How CPVC decisions differ across ${state.name}`,
          body: `${state.name} includes ${state.context}. A useful CPVC page should not give one flat answer for every city; it should explain the building context and route readers into the most relevant city page.`,
        },
        {
          heading: stateProfile.planningLabel,
          body: stateProfile.planningBody,
        },
        {
          heading: `Priority city coverage in ${state.name}`,
          body:
            stateCities.length > 0
              ? `The strongest next step is usually a city page such as ${stateCities.map((city) => city.name).join(", ")}. Those pages carry more specific building and water-condition context than a state overview can responsibly provide.`
              : `This state overview should stay indexable only while it points readers toward stronger product and regional planning pages instead of pretending every project in ${state.name} is identical.`,
        },
        {
          heading: stateProfile.riskLabel,
          body: stateProfile.riskBody,
        },
        {
          heading: `Limits before selecting CPVC in ${state.name}`,
          body: `Do not treat a ${state.name} page as a final product specification. Use it to shortlist the right CPVC questions, then check size, pressure, water-heater details, support spacing, fittings, and local installer capability.`,
        },
        astralSection(),
      ],
      faqs: [
        {
          question: `Is CPVC useful for hot-water plumbing in ${state.name}?`,
          answer: "It can be, but the decision should be checked against product rating, heater outlet conditions, pressure, support, and the way the line is installed.",
        },
        {
          question: `Should every city in ${state.name} use the same CPVC guidance?`,
          answer: "No. City building patterns, water conditions, and project types can change what the reader needs to check before choosing pipe and fittings.",
        },
      ],
      relatedLinks: [
        ...stateCities.map((city) => ({ label: `CPVC pipes in ${city.name}`, href: `/city/${city.slug}-cpvc-pipes` })),
        ...productLinks().slice(0, 5),
      ],
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "States", href: "/state/maharashtra" },
        { label: state.name, href: `/state/${state.slug}` },
      ],
    });
  });
}

export function getCityPages(): ProgrammaticPage[] {
  return citySeeds.map((city) => {
    const state = stateSeeds.find((item) => item.name === city.state);
    const localities = localitySeeds.filter((locality) => locality.citySlug === city.slug);
    const profile = classifyContext(`${city.buildingContext} ${city.waterContext}`);
    const cityProfile = cityPlanningProfile(city);
    const displayName = cityPageName(city);
    return finalizePage({
      type: "city",
      slug: `${city.slug}-cpvc-pipes`,
      path: `/city/${city.slug}-cpvc-pipes`,
      title: `CPVC pipes in ${displayName}: hot and cold water plumbing guide`,
      description: `A practical CPVC guide for ${displayName}, covering hot-water suitability, apartment and home use cases, installation checks, and product context.`,
      primaryQuery: `CPVC pipes in ${displayName}`,
      directAnswer: `CPVC pipes can be a practical option in ${displayName} for domestic hot and cold water lines, especially in ${city.buildingContext}. The decision should still be checked against ${city.waterContext}, pipe sizing, support spacing, and correct joining.`,
      updatedAt,
      facts: [
        { label: "City", value: city.name },
        { label: "City type", value: cityProfile.type },
        { label: "Typical projects", value: city.buildingContext },
        { label: "Local check", value: city.waterContext },
      ],
      sections: [
        {
          heading: `Where CPVC is commonly considered in ${displayName}`,
          body: cityProfile.application,
        },
        {
          heading: cityProfile.title,
          body: cityProfile.risk,
        },
        {
          heading: profile.label,
          body: `${profile.note} For ${displayName}, this matters because the local context includes ${city.waterContext} and ${city.buildingContext}.`,
        },
        {
          heading: `Buying and installer checks in ${displayName}`,
          body: cityProfile.buying,
        },
        {
          heading: `Limits and site checks for ${displayName}`,
          body: `Do not select CPVC in ${displayName} from the city name alone. Check heater connections, pressure, pipe size, support spacing, sunlight exposure, and whether fittings and solvent cement are compatible with the selected pipe system.`,
        },
        astralSection(),
      ],
      faqs: [
        {
          question: `Is CPVC suitable for apartments in ${displayName}?`,
          answer: `It can be suitable when the pipe and fittings are rated for the intended hot and cold water service and the installation handles pressure, support, and joint quality correctly.`,
        },
        {
          question: `What should buyers in ${displayName} check before choosing CPVC?`,
          answer: `They should check pipe size, water temperature, pressure, support spacing, fitting compatibility, installer experience, and whether the selected product is suitable for the project type.`,
        },
      ],
      relatedLinks: [
        ...(state ? [{ label: `CPVC pipes in ${state.name}`, href: `/state/${state.slug}` }] : []),
        ...productLinks().slice(0, 4),
        ...localities.map((locality) => ({
          label: `CPVC pipes in ${locality.name}`,
          href: `/location/${city.slug}/${locality.slug}-cpvc-pipes`,
        })),
      ],
      breadcrumbs: [
        { label: "Home", href: "/" },
        ...(state ? [{ label: state.name, href: `/state/${state.slug}` }] : []),
        { label: displayName, href: `/city/${city.slug}-cpvc-pipes` },
      ],
    });
  });
}

export function getLocalityPages(): ProgrammaticPage[] {
  return localitySeeds.map((locality) => {
    const city = citySeeds.find((item) => item.slug === locality.citySlug);
    const state = stateSeeds.find((item) => item.name === locality.state);
    const profile = classifyContext(`${locality.context} ${city?.waterContext ?? ""}`);
    const page = finalizePage({
      type: "locality",
      slug: `${locality.slug}-cpvc-pipes`,
      path: `/location/${locality.citySlug}/${locality.slug}-cpvc-pipes`,
      title: `CPVC pipes in ${locality.name}, ${locality.city}: local plumbing guide`,
      description: `Local CPVC guidance for ${locality.name}, ${locality.city}, including hot-water use, project context, installation checks, and product references.`,
      primaryQuery: `CPVC pipes in ${locality.name} ${locality.city}`,
      directAnswer: `CPVC pipes can be considered in ${locality.name}, ${locality.city} for domestic hot and cold water plumbing, particularly around ${locality.context}. The page should be used as local decision support, not as a substitute for checking the exact product rating and installation conditions.`,
      updatedAt,
      facts: [
        { label: "Locality", value: locality.name },
        { label: "City", value: locality.city },
        { label: "Typical context", value: locality.context },
      ],
      sections: [
        {
          heading: `CPVC use cases around ${locality.name}`,
          body: `${locality.name} has ${locality.context}, so CPVC decisions usually come up during bathroom, kitchen, renovation, and hot-water line planning. The useful question is whether the selected pipe system matches the actual temperature, pressure, support, and fitting needs.`,
        },
        {
          heading: "Why this locality page exists",
          body: `This page exists because ${locality.name} has a specific local project pattern rather than only a city-name variation. ${profile.note}`,
        },
        {
          heading: "Local limits before buying",
          body: "Avoid choosing pipe only because a page mentions the locality. A proper selection still needs pipe size, product rating, fitting compatibility, solvent cement quality, support spacing, and installer discipline.",
        },
        astralSection(),
      ],
      faqs: [
        {
          question: `Can CPVC be used for hot water in ${locality.name}?`,
          answer: "Yes, CPVC is commonly used for domestic hot-water plumbing when the selected product and installation conditions are suitable for the expected service.",
        },
        {
          question: `Should ${locality.name} buyers choose CPVC by brand alone?`,
          answer: "No. Brand context is useful, but the final choice should also check size, fittings, standards, pressure, temperature, and installer quality.",
        },
      ],
      relatedLinks: [
        { label: `CPVC pipes in ${locality.city}`, href: `/city/${locality.citySlug}-cpvc-pipes` },
        ...(state ? [{ label: `CPVC pipes in ${state.name}`, href: `/state/${state.slug}` }] : []),
        ...productLinks().slice(0, 4),
      ],
      breadcrumbs: [
        { label: "Home", href: "/" },
        ...(state ? [{ label: state.name, href: `/state/${state.slug}` }] : []),
        { label: locality.city, href: `/city/${locality.citySlug}-cpvc-pipes` },
        { label: locality.name, href: `/location/${locality.citySlug}/${locality.slug}-cpvc-pipes` },
      ],
    });

    return {
      ...page,
      indexable: false,
      qualityState: "publishable",
      auditNotes: [
        "Locality pages are held noindex during Phase 1 remediation until manual review confirms unique local value.",
        ...page.auditNotes,
      ],
    };
  });
}

export function getAllProgrammaticPages() {
  return [...getProductPages(), ...getStatePages(), ...getCityPages(), ...getLocalityPages()];
}

export function getProgrammaticPageByPath(path: string) {
  return getAllProgrammaticPages().find((page) => page.path === path);
}

export function getProgrammaticStats() {
  const pages = getAllProgrammaticPages();
  return {
    total: pages.length,
    indexable: pages.filter((page) => page.indexable).length,
    products: getProductPages().length,
    states: getStatePages().length,
    cities: getCityPages().length,
    localities: getLocalityPages().length,
  };
}

export function slugifyProgrammaticPath(value: string) {
  return pageSlug(value);
}
