import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

class Dataset:
    PATH = "C:/daily_journal/api/app/dataset/swe-sentiment-dataset-with-syntethic.csv"
    DF = pd.read_csv(PATH)
    DF = DF.dropna(subset=["text"])


class Models:
    MODEL_PATH = "C:/daily_journal/api/app/model.pkl"
    MODEL = None
    with open(MODEL_PATH, 'rb') as f:
        MODEL = pickle.load(f)

    VECTORIZER_PATH = "C:/daily_journal/api/app/vectorizer.pkl"
    VECTORIZER = None
    with open(VECTORIZER_PATH, 'rb') as f:
        VECTORIZER = pickle.load(f)
    

    
def get_sentiment_from_text(file_path):
    dataset = Dataset()
    model = Models().MODEL
    vectorizer = Models().VECTORIZER
    #vectorizer.fit_transform(dataset.DF["text"]).toarray()
    with open(file_path, "r") as file:
        contents = file.read()
        test_sentence_vectorized = vectorizer.transform([contents]).toarray()
        predicted = model.predict(test_sentence_vectorized)
        print(predicted)

        return "Positive" if predicted == 1 else "Negative"
    
