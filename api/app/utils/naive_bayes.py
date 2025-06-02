import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from pathlib2 import Path
import re
import random
from sklearn.naive_bayes import MultinomialNB

import pickle



    

def remove_http_links(df) -> pd.DataFrame:
    df["text"] = df["text"].str.replace(r'https?://[^\s<>"]+|www\.[^\s<>"]+', "", regex=True)
    return df

def remove_emojies(df) -> pd.DataFrame:
    df["text"] = df["text"].str.replace(r'[^\w\s,]', "", regex=True)
    return df


def remove_http_links2(context) -> str:
    return re.sub(r'https?://[^\s<>"]+|www\.[^\s<>"]+', "", context)

def remove_emojies2(context) -> str:
    return re.sub(r'[^\sa-zA-Zåäö_,]', "", context)





def generate_synthetic_data():
    base_phrases_negative = [
    "Jag mår skit.",
    "Jag har ångest idag.",
    "Allt känns meningslöst.",
    "Jag orkar inte mer.",
    "Det är tungt just nu.",
    "Jag känner mig ensam och tom.",
    "Jag vill bara sova bort allt.",
    "Inget spelar någon roll längre.",
    "Jag känner mig värdelös.",
    "Jag har tappat all motivation.",
    "Det gör ont inombords.",
    "Jag vill inte prata med någon.",
    "Jag känner bara ångest varje dag.",
    "Det känns som att allt går fel.",
    "Jag hatar hur jag känner mig.",
    "Jag har ingen energi kvar.",
    "Jag gråter varje kväll.",
    "Jag vill bara försvinna.",
    "Det finns inget ljus i mitt liv.",
    "Jag vaknar med ångest varje morgon.",
    "Jag känner mig svag och bräcklig.",
    "Jag är trött på att låtsas må bra.",
    "Jag klarar inte en dag till.",
    "Jag vill inte gå upp ur sängen.",
    "Mina tankar är mörka hela tiden.",
    "Jag känner ingen glädje längre.",
    "Livet känns överväldigande.",
    "Jag känner mig som en börda.",
    "Jag är rädd för mina egna tankar.",
    "Det är svårt att andas ibland.",
    "Jag känner mig totalt hopplös.",
    "Jag vill bara vara ifred hela tiden.",
    "Jag känner mig oälskad.",
    "Det känns som att jag förlorar mig själv.",
    "Jag har tappat kontrollen.",
    "Inget får mig att le längre.",
    "Jag är fast i mitt eget huvud.",
    "Jag har ingen vilja kvar.",
    "Det är som att jag drunknar inombords.",
    "Jag känner mig konstant stressad och ledsen.",
    "Jag vill bara skrika och gråta.",
    "Allt är för mycket just nu.",
    "Livet suger röv idag. Jag orkar fan inte mer.",
    "Allt känns piss just nu. Jag vill bara skrika.",
    "Jag mår skit och det blir fan aldrig bättre.",
    "Det känns som att jag håller på att gå sönder inifrån.",
    "Jag kan inte sova, jag tänker för mycket och allting är fucked.",
    "Jag har noll energi och känner mig som skit.",
    "Jag hatar hur jävla tomt det känns i mig.",
    "Det känns som att jag drunknar i mitt eget jävla huvud.",
    "Jag pallar inte den här skiten längre.",
    "Fan vad allt bara suger. Jag är så jävla trött.",
    "Jag vill bara försvinna och slippa allt jävla ansvar.",
    "Det är som att världen bara pissar på mig varje dag.",
    "Jag går runt med ångest 24/7 och ingen fattar ett skit.",
    "Inget känns verkligt längre. Det är bara en grå jävla dimma.",
    "Jag vill slå sönder något bara för att få känna något.",
    "Det gör ont att andas. Det gör ont att tänka. Allt gör fan ont.",
    "Jag känner mig som ett jävla misslyckande.",
    "Allt känns meningslöst och jag är så jävla less.",
    "Jag gråter, svär och stirrar i taket varje natt. Det här är inte ett liv.",
    "Jag hatar hur min hjärna sabbar allt. Jag orkar inte leva så här.",
    "Jag mår så jävla dåligt att det skrämmer mig.",
    "Jag har ingen kvar. Ingen. Och jag är trött på att låtsas.",
    "Jag är så jävla trött på att kämpa. Det räcker nu.",
    "Allt är bara en jävla kamp. En kamp jag förlorar varje dag.",
    "Jag vill bara skrika rakt ut tills någon hör mig – på riktigt.",
    "Det känns som att allt jag gör blir till skit.",
    "Jag försöker andas men det känns som att jag kvävs av ångest.",
    "Allting bara snurrar och jag kan inte få stopp på helvetet i mitt huvud.",
    "Folk säger att det blir bättre men det är bara jävla bullshit.",
    "Jag känner mig som världens största jävla skämt.",
    "Jag hatar att vakna upp till ännu en jävla dag i det här kaoset.",
    "Jag skrattar ibland men innerst inne mår jag som ett jävla vrak.",
    "Allt jag rör vid går åt helvete förr eller senare.",
    "Jag hatar att känna så här men jag kan fan inte hjälpa det.",
    "Min kropp känns tung som bly och jag orkar inte ett skit.",
    "Det är som att jag bär hela jävla världen på axlarna och ingen ser det.",
    "Jag vill bara ligga under täcket och glömma att jag finns.",
    "Folk säger åt mig att rycka upp mig – de kan dra åt helvete.",
    "Jag är så jävla trött på att vara stark för andras skull.",
    "Inget känns rätt längre. Jag är fan helt vilse.",
    "Varenda dag är som att gå genom jävla lera med bly i bröstet.",
    "Jag tänker för mycket och känner för hårt och allt blir bara kaos.",
    "Jag orkar inte ens låtsas längre. Jag är fan slut.",
    "Mina tankar är som knivar i huvudet och jag får aldrig vila.",
    "Jag vill bara slippa känna, tänka, finnas – bara en jävla paus.",
    "Jag är så jävla rädd för att vara ensam, men ändå skjuter jag bort folk.",
    "Det är som att något äter upp mig inifrån och jag kan inte stoppa det.",
    "Jag vet inte ens vad jag känner längre, bara att det gör ont som fan.",
    "Jag är så trött på den här jävla fasaden jag drar runt på varje dag.",
]
    base_phrases_positive = [
    "Jag mår bra idag.",
    "Jag känner mig lugn och stabil.",
    "Allt känns möjligt just nu.",
    "Jag har mer ork än jag trodde.",
    "Det känns lättare för varje dag.",
    "Jag känner mig trygg i mig själv.",
    "Jag ser fram emot dagen.",
    "Det spelar roll att jag finns.",
    "Jag duger som jag är.",
    "Jag har hittat ny motivation.",
    "Det känns varmt inombords.",
    "Jag ser värde i att prata med andra.",
    "Jag känner ett lugn varje morgon.",
    "Det känns som att saker börjar vända.",
    "Jag accepterar hur jag känner mig.",
    "Jag känner mig fylld av livskraft.",
    "Jag somnar med en känsla av tacksamhet.",
    "Jag vill leva och uppleva mer.",
    "Det finns ljus i mitt liv.",
    "Jag vaknar med hopp i hjärtat.",
    "Jag känner mig stark och levande.",
    "Jag är stolt över att jag kämpar.",
    "Jag klarar den här dagen också.",
    "Jag går upp och välkomnar livet.",
    "Mina tankar känns mer balanserade.",
    "Jag kan känna glädje igen.",
    "Livet känns hanterbart just nu.",
    "Jag känner att jag är viktig.",
    "Jag är vän med mina tankar.",
    "Jag kan andas djupt och känna ro.",
    "Jag känner mig hoppfull inför framtiden.",
    "Jag behöver min egen tid – och det är okej.",
    "Jag är värd kärlek och omtanke.",
    "Jag lär känna mig själv mer för varje dag.",
    "Jag hittar tillbaka till mig själv.",
    "Små saker får mig att le.",
    "Jag börjar förstå vad jag behöver.",
    "Min vilja växer sig starkare.",
    "Jag känner mig som helast inombords.",
    "Jag hanterar stress med mer lugn nu.",
    "Jag kan både skratta och gråta.",
    "Jag klarar mer än jag tror.",
    "Jag är inte ensam – jag har stöd.",
    "Jag börjar tro på det jag gör.",
    "Jag lär mig att förstå mina känslor.",
    "Jag ser mina framsteg tydligare.",
    "Jag vill fortsätta finnas till.",
    "Min kropp och själ återhämtar sig.",
    "Någon förstår hur jag känner mig.",
    "Jag hittar tillbaka till mitt lugn.",
    "Jag känner mig fylld av mening.",
    "Verkligheten känns klarare nu.",
    "Jag håller fast vid mig själv.",
    "Jag kan känna och leva fullt ut.",
    "Jag vet att jag klarar nästa steg.",
    "Jag är tillräcklig som jag är.",
    "Mina tankar börjar lätta.",
    "Jag ser det positiva omkring mig.",
    "Jag känner mig mer delaktig i världen.",
    "Livet börjar kännas lättare.",
    "Jag har makt över mitt liv.",
    "Jag vet att någon bryr sig.",
    "Min styrka syns kanske inte – men den finns.",
    "Jag fortsätter, steg för steg.",
    "Jag skäms inte för hur jag mår – jag är mänsklig.",
    "Jag låter tårar komma och gå.",
    "Jag ser nyanser i det som kändes mörkt.",
    "Jag får plats i andras liv.",
    "Jag börjar acceptera alla mina känslor.",
    "Jag förtjänar att må bra.",
    "Jag ser ett ljus i mitt inre.",
    "Jag hanterar det som tidigare skrämde mig.",
    "Jag känner hopp inom mig.",
    "Jag kan möta världen på mitt sätt.",
    "Jag börjar se mitt eget värde.",
    "Jag hör hemma i mitt eget liv.",
    "Det jag gör har betydelse.",
    "Jag är stark – även när jag tvivlar.",
    "Jag tror mer på mig själv för varje dag.",
    "Framtiden känns inte lika skrämmande längre.",
    "Jag kan känna sann glädje.",
    "Jag vågar möta människor igen.",
    "Jag börjar känna mig bekväm i min kropp.",
    "Jag minns hur det känns att må bra.",
    "Jag är inte ett misslyckande – jag växer.",
    "Jag kämpar – och det är modigt.",
    "Jag ser små ljusglimtar varje dag.",
    "Jag vet att jag kommer vidare.",
    "Jag går inte ensam genom det här.",
    "Jag tillåter mig själv att må bättre.",
    "Jag är värd hjälp och stöd."
]


    # Generate variations by adding context, intensity, or combining statements
    additional_phrases = []
    for i in range(500):
        print(f"Generating negative phrase {i+1} of 5000")
        for phrase in base_phrases_negative:
            variations_negative = [
                f"{phrase} Det har varit så i flera dagar.",
                f"{phrase} Och jag vet inte vad jag ska göra åt det.",
                f"{phrase} Det känns som att det aldrig kommer bli bättre.",
                f"{phrase} Jag har försökt men inget hjälper.",
                f"{phrase} Det är verkligen svårt just nu."
                f"{phrase} Jag känner mig helt överväldigad.",
                f"{phrase} Jag har ingen energi kvar.",
                f"{phrase} Det känns som att jag drunknar i mina känslor.",
                f"{phrase} Jag har ingen att prata med.",
                f"{phrase} Jag känner mig helt ensam i det här.",
                f"{phrase} Jag har ingen motivation kvar.",
                f"{phrase} Jag känner mig som en börda för alla omkring mig.",
                f"{phrase} Jag vill bara gömma mig från världen.",
                f"{phrase} Jag känner mig som en skugga av mitt forna jag.",
                f"{phrase} Jag har svårt att se något positivt i livet.",  
                f"{phrase} Jag har mycket ångest just nu.",
                f"{phrase} Jag känner mig helt tom inombords.",
                f"{phrase} Jag har ingen lust att göra något.",
                f"{phrase} Jag känner mig som en främling i mitt eget liv.",
                f"{phrase} Jag mår skit just nu.",
                f"{phrase} Jag känner mig helt förlorad.",
                f"{phrase} Jag mår piss just nu.",
                f"{phrase} Jag känner mig helt utmattad.",
                f"{phrase} Jag är rädd för att göra fel",
                f"{phrase} Jag känner mig helt överväldigad av allt.",
                f"{phrase} Jag har ingen aning om hur jag ska ta mig ur det här.",
                f"{phrase} Jag känner mig helt fast i min egen hjärna.",
            ]
            random_choice_variations = random.choice(variations_negative)
            additional_phrases.append(random_choice_variations)

    
    
    return additional_phrases


def generate_synthetic_data_positive():
    base_phrases_positive = [
    "Jag mår bra idag.",
    "Jag känner mig lugn och stabil.",
    "Allt känns möjligt just nu.",
    "Jag har mer ork än jag trodde.",
    "Det känns lättare för varje dag.",
    "Jag känner mig trygg i mig själv.",
    "Jag ser fram emot dagen.",
    "Det spelar roll att jag finns.",
    "Jag duger som jag är.",
    "Jag har hittat ny motivation.",
    "Det känns varmt inombords.",
    "Jag ser värde i att prata med andra.",
    "Jag känner ett lugn varje morgon.",
    "Det känns som att saker börjar vända.",
    "Jag accepterar hur jag känner mig.",
    "Jag känner mig fylld av livskraft.",
    "Jag somnar med en känsla av tacksamhet.",
    "Jag vill leva och uppleva mer.",
    "Det finns ljus i mitt liv.",
    "Jag vaknar med hopp i hjärtat.",
    "Jag känner mig stark och levande.",
    "Jag är stolt över att jag kämpar.",
    "Jag klarar den här dagen också.",
    "Jag går upp och välkomnar livet.",
    "Mina tankar känns mer balanserade.",
    "Jag kan känna glädje igen.",
    "Livet känns hanterbart just nu.",
    "Jag känner att jag är viktig.",
    "Jag är vän med mina tankar.",
    "Jag kan andas djupt och känna ro.",
    "Jag känner mig hoppfull inför framtiden.",
    "Jag behöver min egen tid – och det är okej.",
    "Jag är värd kärlek och omtanke.",
    "Jag lär känna mig själv mer för varje dag.",
    "Jag hittar tillbaka till mig själv.",
    "Små saker får mig att le.",
    "Jag börjar förstå vad jag behöver.",
    "Min vilja växer sig starkare.",
    "Jag känner mig som helast inombords.",
    "Jag hanterar stress med mer lugn nu.",
    "Jag kan både skratta och gråta.",
    "Jag klarar mer än jag tror.",
    "Jag är inte ensam – jag har stöd.",
    "Jag börjar tro på det jag gör.",
    "Jag lär mig att förstå mina känslor.",
    "Jag ser mina framsteg tydligare.",
    "Jag vill fortsätta finnas till.",
    "Min kropp och själ återhämtar sig.",
    "Någon förstår hur jag känner mig.",
    "Jag hittar tillbaka till mitt lugn.",
    "Jag känner mig fylld av mening.",
    "Verkligheten känns klarare nu.",
    "Jag håller fast vid mig själv.",
    "Jag kan känna och leva fullt ut.",
    "Jag vet att jag klarar nästa steg.",
    "Jag är tillräcklig som jag är.",
    "Mina tankar börjar lätta.",
    "Jag ser det positiva omkring mig.",
    "Jag känner mig mer delaktig i världen.",
    "Livet börjar kännas lättare.",
    "Jag har makt över mitt liv.",
    "Jag vet att någon bryr sig.",
    "Min styrka syns kanske inte – men den finns.",
    "Jag fortsätter, steg för steg.",
    "Jag skäms inte för hur jag mår – jag är mänsklig.",
    "Jag låter tårar komma och gå.",
    "Jag ser nyanser i det som kändes mörkt.",
    "Jag får plats i andras liv.",
    "Jag börjar acceptera alla mina känslor.",
    "Jag förtjänar att må bra.",
    "Jag ser ett ljus i mitt inre.",
    "Jag hanterar det som tidigare skrämde mig.",
    "Jag känner hopp inom mig.",
    "Jag kan möta världen på mitt sätt.",
    "Jag börjar se mitt eget värde.",
    "Jag hör hemma i mitt eget liv.",
    "Det jag gör har betydelse.",
    "Jag är stark – även när jag tvivlar.",
    "Jag tror mer på mig själv för varje dag.",
    "Framtiden känns inte lika skrämmande längre.",
    "Jag kan känna sann glädje.",
    "Jag vågar möta människor igen.",
    "Jag börjar känna mig bekväm i min kropp.",
    "Jag minns hur det känns att må bra.",
    "Jag är inte ett misslyckande – jag växer.",
    "Jag kämpar – och det är modigt.",
    "Jag ser små ljusglimtar varje dag.",
    "Jag vet att jag kommer vidare.",
    "Jag går inte ensam genom det här.",
    "Jag tillåter mig själv att må bättre.",
    "Jag är värd hjälp och stöd."
    ]

    additional_phrases = []
    for i in range(2000):
        print(f"Generating positive phrase {i+1} of 5000")
        for phrase in base_phrases_positive:
            variations_positive = [
                f"{phrase} Men det känns som att saker börjar falla på plats. Det är kul",
                f"{phrase} Men jag känner en ny form av klarhet i tankarna. Det är kul",
                f"{phrase} Men det känns som att det faktiskt kan bli bättre.",
                f"{phrase} Men jag märker små framsteg varje dag.",
                f"{phrase} Men det är verkligen fint just nu.",
                f"{phrase} Men jag känner mig hoppfull inför framtiden.",
                f"{phrase} Men jag har mer energi än på länge.",
                f"{phrase} Men det känns som att jag håller på att hitta mig själv.",
                f"{phrase} Men jag har någon att prata med som verkligen lyssnar.",
                f"{phrase} Men jag känner mig omgiven av stöd.",
                f"{phrase} Men jag har hittat ny motivation.",
                f"{phrase} Men jag känner att jag betyder något för andra.Det är kul",
                f"{phrase} Men jag vågar möta världen med öppet hjärta.",
                f"{phrase} Men jag känner mig som en starkare version av mig själv.Det är kul",
                f"{phrase} Men jag ser äntligen det ljusa i livet.",
                f"{phrase} Men jag känner ett lugn inom mig.",
                f"{phrase} Men jag känner mig fylld av mening.",
                f"{phrase} Men jag har lust att göra saker som får mig att må bra.",
                f"{phrase} Men jag känner mig mer i kontakt med mig själv än någonsin.",
                f"{phrase} Men jag mår riktigt bra just nu.",
                f"{phrase} Men jag känner mig trygg i den jag är.Det är kul",
                f"{phrase} Men jag känner glädje i det lilla.",
                f"{phrase} Men jag känner mig utvilad och tacksam.",
                f"{phrase} Men nu är jag trött och ska gå och sova så jag är pigg imorgon ",
                f"{phrase} Men jag är trött för att jag gjort saker hela dagen och det är okej",
                f"{phrase} Jag gillar att umgås med mina vänner Det är kul",
                f"{phrase} Jag älskar att vara ute i naturen och njuta av livet.",
                f"{phrase} Jag känner mig lycklig när jag är med mina nära och kära.",
                f"{phrase} Jag älskar att göra saker som får mig att skratta.",
                f"{phrase} Jag gillar att lära mig nya saker och växa som person.",
                f"{phrase} Jag älskar att känna mig levande och energisk. Det är kul",

            ]

            random_choice_variations = random.choice(variations_positive)
            additional_phrases.append(random_choice_variations)
    
    return additional_phrases

def add_syntethic_data_to_df(df: pd.DataFrame, syntethic_data_negative: list, syntethic_data_positive) -> pd.DataFrame:
    tmp_df = pd.DataFrame(columns=["text", "label"])
    tmp = len(syntethic_data_negative)
    for idx, sentence in enumerate(syntethic_data_negative):
        print(f"Adding sentence {idx+1} of {tmp}")
        tmp_df = tmp_df._append({"text": sentence, "label": 0}, ignore_index=True)

    tmp_df2 = pd.DataFrame(columns=["text", "label"])
    tmp = len(syntethic_data_positive)
    for idx, sentence in enumerate(syntethic_data_positive):
        print(f"Adding positive sentence {idx+1} of {tmp}")
        tmp_df2 = tmp_df2._append({"text": sentence, "label": 1}, ignore_index=True)
    
    df = pd.concat([df, tmp_df2], ignore_index=True)
    tmp_df = pd.concat([tmp_df, tmp_df2], ignore_index=True)
    df = tmp_df.sample(frac=1, random_state=42)
    return df


def train_model(X, df) -> GaussianNB:

    y = df["label"].astype(int)
    model = MultinomialNB()
    X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2)
    model.fit(X_train, y_train)
    return model


def main():
    vectorizer = TfidfVectorizer()
    syntethic_data = generate_synthetic_data()
    syntethic_data_positive = generate_synthetic_data_positive()
    old_df = pd.read_csv("swe-sentiment-dataset.csv")
    df = pd.DataFrame()
    df["text"] = old_df["text"]
    df["label"] = old_df["label"].apply(lambda x: 1 if x == "pos" else 0)
    df = remove_http_links(df)
    df = remove_emojies(df)
    df = add_syntethic_data_to_df(df, syntethic_data, syntethic_data_positive)
    df.to_csv("swe-sentiment-dataset-with-syntethic.csv", index=False)

    vectorizer = TfidfVectorizer()
    
    df = pd.read_csv("swe-sentiment-dataset-with-syntethic.csv")
    df = df.dropna(subset=["text"])
    X = vectorizer.fit_transform(df["text"]).toarray() 
    model = train_model(X, df)
    with open('model.pkl','wb') as f:
        pickle.dump(model,f)

    with open('vectorizer.pkl','wb') as f:
        pickle.dump(vectorizer,f)

    
main()
