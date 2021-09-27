import pandas as pd
import pickle


def get_model():
    pickled_model = pickle.load(open('model.pkl', 'rb'))
    return pickled_model


def predict(features):


    answer_bins = [0, 24, 6000]
    answer_bins_group_names = ["<1D", ">1D"]
    df = pd.DataFrame(features)

    # Categorize score based on the bins.
    df['accepted_answer_duration_bin'] = pd.cut(df['accepted_answer_duration'], answer_bins, labels=answer_bins_group_names)



    """
    Data precprocessing
    """

    X = df[["", "", ]]
    pickled_model = get_model()
    result = pickled_model.predict(X)
    return result