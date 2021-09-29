# Final Project: First Segment Project Deliverable

## Selected Topic: Stack Overflow Response Analysis

## Overview
As students who use stack overflow as a learning tool, we want data on the best times to be online and post our questions to get an approved answer in a timely manner, and keep our momentum as we learn. The purpose of this project is to determine the relationships between the features of Stack Overflow question posts (such as day of week, time of day, number of tags, length of the title and body, etc...) to predict whether a question will be answered in less than a day (24h).

A preliminary blueprint of our presentation can be found <a href="https://docs.google.com/presentation/d/15kTuWhoe7wkIMbArFtzzjpAhdlgMxx0VxfjKJXMSsgM/edit#slide=id.gf2488678bb_0_652">here</a>.


## Data Sources
Our team is using the Stack Overflow Big Data dataset from Google Cloud Platform (GCP, formerly BigQuery). 

The Stack Overflow GCP dataset has several tables that store information about posts, users, badges, tags and other attributes. For this segment of the project, the team queried two tables to extract sample data necessary to test the Machine Learning model. These tables were the “post_questions” and “post_answers” tables. More tables will be queried for future segments of the project.

## Questions we want to answer

- What are factors that lead to short times to approved answers?
- What is the mean time between question and approved answer?
- What is the median time between question and approved answer?
- What are the peak hours of the day where the most approved answers are provided?
- What is the correlation between the number of tags and time to an approved answer?
- Do the number of tags impact the number of approved responses?

## Dashboard
Our dashboard can be found <a href="https://stackoverflow-modelpredictor.herokuapp.com/">here</a>.

## Database

### First Segment
For the first segment, the GCP dataset served as the database. A local database was not created due to the size of the sample data, which was stored within Pandas DataFrames for transformation and analysis. We extracted sample data for the month of May 2021 by querying the “post_questions” and “post_answers” tables from GCP to perform Exploratory Data Analysis by cleaning and transforming it to provide an input for the Machine Learning model.

### Second Segment
For the second segment, we expanded our GCP query of the “post_questions” and “post_answers” tables to include all posts from 2021 and created a local database using PostgresSQL. We created a local database due to the size of the dataset being pulled from GCP. Then, the data from the GCP query was stored within Pandas DataFrames and then written to PostgresSQL via pgAdmin tables. Once a local copy of the raw data was created, we performed various JOINS to the stored tables via SQL, then it was pulled back into Pandas DataFrames for transformation and analysis.

### Third Segment
For the third segment, we maintained the size of our dataset by querying the “post_questions” and “post_answers” tables to include all posts from 2021. We then created an online database using Heroku and PostgresSQL. Table JOINS, data transformation and analysis were all performed through Jupyter Notebook, while maintaining up-to-date data tables in Heroku.


## Data Extraction

As we are interested in a subset of this large data with 20 columns of data, we performed several queries and then cleaned the data to create a **post_questions** Pandas DataFrame that will provide insight on Stack Overflow questions:
Reduced scope of our data so that **question_creation_date** had data after January 1, 2021
Filtered data so we’re only dealing with questions that had an accepted answer (identified with a not null value under **accepted_answer_id**) 

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/post_questions.png>
  </p>

We performed similar steps to create a cleaned **post_answers** Pandas DataFrame that will provide insight on Stack Overflow answer statistics:
Reduced scope of our data so that **answer_creation_date** had data after ~May 1, 2021~ **January 1, 2021**

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/post_answers.png>
  </p>

## Exploratory Data Analysis

The following histograms show how the data that was extracted as potential ML features are distributed.

![](https://github.com/smanowar/final-project/blob/main/Images/histo_1.png)

![](https://github.com/smanowar/final-project/blob/main/Images/histo_2.png)

![](https://github.com/smanowar/final-project/blob/main/Images/histo_3.png)

These histograms provide the approximate minimum and maximum values for each feature, and visually show us an approximate representation of the distribution of numerical data. From these histograms we can see that certain potential features show a distribution pattern, but others do not.

In addition to the histograms, we created a correlation matrix to explore which features could be eliminated.

![](https://github.com/smanowar/final-project/blob/main/Images/correlation_matrix.png)

At this stage, we decided to eliminate "q_title_char_count" because it largely overlapped with "q_title_word_count". We chose to keep title word count over character count because it is more intuitive for people to be able to estimate the number of words in a phrase than the number of characters. Therefore, users can be cued to adjust their title length to a given word count more easily than a given character count. 

## Data Transformation
  
We imported both DataFrames into our Heroku database as separate tables. We performed an inner join between the two tables to create a **duration** table using SQL. 

After creating the **duration** table, we read it directly into Jupyter Notebook as a DataFrame to perform several cleaning steps and transformations:
* Extracted the weekday from the question_creation_date and added a new column: 
  * question_day 
* Extracted the hour from the question_creation_date and added a new column:
  * question_hour 
* Subtracted answer_creation_date from question_creation_date (to calculate the duration between when a user gave an accepted answer to a question) and added a new column: 
  *  accepted_answer_duration 

After these transformations, we imported the DataFrame back into the database to replace the original **duration** table. The new **duration** table was merged with the **posts_questions** table to create a **ml_input** table which we would use for the machine learning model. 

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/heroku_schema.png>
  </p>

Please note that all queries are embedded in the jupyter notebook.

The following figure shows the ERD for the tables used in this segment of the project:

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/QuickDBD-export%20(1).png>
  </p>

## Machine Learning Component

### Supervised Machine Learning - Random Forest Classifier and EasyEnsemble Classifier

 

The question we originally intended to answer with the machine learning component of our project was:

<p align="center">

  <i><b>"What are factors that lead to short times to approved answers?"</b></i>

</p>

 

However, after running the a linear regression model, the accuracy of the model was close to 0%.

 

<p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/linear_regression_accuracy.PNG>

  </p>

 

We therefore decided to reframe our question such that it can be analyzed using a classification model, reframing the question as:

  <p align="center">

  <i><b>"When a user posts a question, will they get an accepted answer within 24 hours?"</b></i>

</p>

 

To explore this we decided to use a Random Forest Classifer, an Easy Ensemble Classifer, and Logistig Regression and compared our results.

The notebook used for this analysis can be found in the path: *machine_learning_code/ML_RandomForest-EE-LogReg.ipynb*

 

### *Data Preprocessing and Feature Selection*

 

In order to maximize accuracy in the model, our data needed to be normalized and outliers accounted for. Due to the size of our data set, we resolved this by binning a number of columns to allow the data to better fit the machine learning model.

 

The tags column was parsed to count the number of tags versus having data in string format.

 

Lastly, columns that were not relevant to the question were dropped and NANs were also dropped. The final set of our features are as follows:

 

- **q_title_word_count**: number of words in the title of the question

- **q_body_word_count**: number of words in the body of the question

- **q_tags_count**: number of tags associated with the question

- **q_hour**: hour of the day the question was posted

- **q_day**: day of the week the quesion was posted

 

Our reasoning for the selected columns are as follows:

 

- the body and character count were considered key for the model because intuitivley the length of a question would allow for a more detailed question. This clarity and specification would inturn help produce an accepted answer. They also ranked as the top features on the feature importance.

 

- Date Time columns were used to analyze how time of day affects the likelihood of getting an accepted answer. The number of users using Stack Overflow fluctuates based on the date and time of day. Therefore, the time and date a question is posted can affect the visibility of the question and can result in an answer being posted sooner.

 

- Another variable that can affect the visibility of a question is the tags that are included in a question. For this reason, the “tags” column was also chosen as a feature. For simplicity, the specific tags associated with the question were converted to the number of tags associated with the question.

 

 

### *Random Forest Classifier*

 

We intially chose to use a Random Forest Classifier for many reasons including:

- model is flexible to both classification and regression problems

- works well with both categorical and continuous values

- allows us to analyze the inputs using feature_importance to make decisions on feature selection to improve accuracy

 

The *accepted_answer_duration* column was originally classified into 3 categories: **response in less than an hour, less than a day, greater than a day**. This yeilded an accuracy of 57%

 

<p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/RF_3_categories_accuracy.PNG>

  </p>

 

To further increase accuracy the *accepted_answer_duration* was further consolidated into two categories: **less than 24 hours, and greater than 24 hours**.

 

The results from the model are as follows:

 

<p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/RF_icr_accuracy_expanded_data.PNG>

  </p>

<p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/RF_cm.PNG>

  </p>

 

The model yeilded the following results:

- accuracy: 61%

- precision (less than 24 hours): 91%

- precision (greater than 24 hours): 20%

 

In attemps to increase accuracy we compared the results to an EasyEnsemble Classifer

 

### *EasyEnsemble Classifer*

The results from the model are as follows:

 

<p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/EE_icr_accuracy_expanded_data.PNG>

  </p>

  <p align ="center">

  <img src=https://github.com/smanowar/final-project/blob/main/Images/EE_cm.PNG>

  </p>

 

The model yeilded:

- accuracy: 63%

- precision (less than 24 hours): 92%

- precision (greater than 24 hours): 21%

 

We decided to try once again with another model.

 

### *Logistic Regression*

The results from the model are as follows:

 

<p align ="center">
  <img src= "https://github.com/smanowar/final-project/blob/main/Images/logreg_icr.PNG?raw=true">
  </p>"

  <p align ="center">
  <img src="https://github.com/smanowar/final-project/blob/main/Images/logreg_cm.PNG?raw=true">
  </p>

 

The model yeilded:

- accuracy: 50%

- precision (less than 24 hours):

- precision (greater than 24 hours):

 

 

### Summary of Findings

Based on the results above we can compare the accuracies of the 3 models:


||Random Forest|Easy Ensemble| Logistic Regression  |
|------:| :-------------: |:-------------:| :-----:|
|Accuracy| 55% |57%| 50% |
|Precision (<24 Hours)| 89%| 89% | 86% |
|Precision (>24 Hours)| 16%| 19% |  0% |
 

From the table above we can see that Random Forest and Easy Ensemble are comparable regarding accuracy and precision. However, the run times for both models differed greaty. The Random Forest Classifier ran in about a minute, while the EasyEnsemble Classifier took about 30 minutes to run. Logistic regression ran quickly, however the results are not what was to be expected. For only yeilding a percentage point difference in accuracy it seems that Random Forest may be the most efficient choice.

 

Given more time, the next steps we would take would be to:

- try using a Deep Learning Neural Networks model to (potentially) improve accuracy

- instead of the number of tags use the tags as categorical data

- take a look at data from the questions with no accepted answers and see how that may impact the results of our model

## Tools We Used

![](https://github.com/smanowar/final-project/blob/main/Images/all-logos.png)

## **Communications Protocols** 

- Each team member will have their own branch to this repository, named after their first names for clarity

    - **Saudia (*smanowar*) branch**: https://github.com/smanowar/final-project/tree/saudia

    - **Esther (*emc1518*) branch**: https://github.com/smanowar/final-project/tree/esther

    - **Suweatha (*ssanmug*) branch** : https://github.com/smanowar/final-project/tree/suweatha

    - **Nisha (*nishavenkatesh11*) branch**: https://github.com/smanowar/final-project/tree/nisha

- Each commit on a branch must include the following information in the comments:

  - Description of the update
  - Identify which component of the project it contributes to
  - Is the update complete or partial

