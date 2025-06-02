import openai



def format_input_text(text):
    prompt = """"
            You are a helpful assistant. Your task is to determine the sentiment of a given text. The sentiment can be either positive, negative, or neutral.
            You shall also provide a very brief summary of the text in swedish The output should be Sentiment: sentiment and Summary: summary. Here is the text:
            {}
            """.format(text)
    return prompt


def split_sentiment_and_summary(text):
    lst = [tmp for tmp in text.split("\n") if tmp != ""]
    out_dict = {}
    for item in lst:
        splitted_txt = item.split(":")
        

        out_dict[splitted_txt[0].strip()] = splitted_txt[1].strip()
    
    return out_dict


def inference(prompt):
    client = openai.OpenAI(
    base_url="https://api.llm7.io/v1",
    api_key="unused"  # No key needed
    )


    response = client.chat.completions.create(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response


def run_prediction(file_path):
    with open(file_path, "r") as f:
        contents = f.read()
        prompt = format_input_text(contents)
        response = inference(prompt)
        out_dict =split_sentiment_and_summary(response.choices[0].message.content)
        return out_dict