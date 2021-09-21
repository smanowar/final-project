# Final Project: First Segment Project Deliverable

## Selected Topic: Stack Overflow Response Analysis

## Overview
As students who use stack overflow as a learning tool, we want data on the best times to be online and post our questions to get an approved answer quickly and keep our momentum as we learn. The purpose of this project is to determine the relationships between the features on Stack Overflow such as time of day, tags, question creation date in order to help users make the most of their studying time.

## Data Sources
Our team is using the Stack Overflow Big Data dataset from Google Cloud Platform (GCP, formerly BigQuery). For the first segment, the GCP dataset served as the database. Due to the size of the sample data, a local database was not created at this stage. Sample data was pulled from GCP, and stored and manipulated within Pandas DataFrames. 

The Stack Overflow GCP dataset has several tables that store information about posts, users, badges, tags and other attributes. For this segment of the project, the team queried two tables to extract sample data necessary to test the Machine Learning model. These tables were the “post_questions” and “post_answers” tables. More tables will be queried for future segments of the project.

## Questions we hope to answer

- What are factors that lead to short times to approved answers?
- What is the mean time between question and approved answer?
- What is the median time between question and approved answer?
- What are the top ten times of day where the most questions are posed?
- What are the top ten times of day where the most approved answers are provided?
- What times of each day see response rates of less than an hour?
- What is the mean time between question and approved answer by tag?
- What is the median time between question and approved answer by tag?
- What is the correlation between tag popularity and time to an approved answer?
- What is the correlation between the number of tags and time to an approved answer? 
- Do the number of tags impact the number of approved responses?
- What is the correlation between the badged questions and time to an approved answer?

## Database
As mentioned above, the GCP Stack Overflow dataset serves as the database for the first segment of this project. By querying the “post_questions” and “post_answers” tables from GCP, we extracted a sample of data to perform Exploratory Data Analysis and cleaned and transformed it to provide the sample data needed to feed the Machine Learning model. 

### Exploratory Data Analysis

To create our sample database for further analysis and machine learning model, we queried from the Stack Overflow Data dataset obtained from BigQuery (Google Cloud Platform). 

As we are interested in a subset of this large data with 20 columns of data, we performed several queries and then cleaned the data to create a **post_questions** Pandas DataFrame that will provide insight on Stack Overflow questions:
Reduced scope of our data so that **question_creation_date** had data after May 1, 2021
Filtered data so we’re only dealing with questions that had an accepted answer (identified with a not null value under **accepted_answer_id**) 

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/post_questions.png>
  </p>

We performed similar steps to create a cleaned **post_answers** Pandas DataFrame that will provide insight on Stack Overflow answer statistics:
Reduced scope of our data so that **answer_creation_date** had data after May 1, 2021
No filtering was required for the **answer_id** at this point of our EDA since we’ll be merging the two DataFrames

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/post_answers.png>
  </p>
  
We merged the two DataFrames with the rationale being that the **accepted_answer_id** from the **post_questions** DF is identical to the **answer_id** from the **post_answers** DF. That way, our merged DF will display questions that had accepted answers for our analysis. 

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/merged_df.png>
  </p>

After creating our merged DF, we performed several cleaning steps and transformations to arrive at our finalized DF for the initial stage of our project:
Compared **accepted_answer_id** and **answer_id** columns to verify they were identical 
Dropped **answer_id** because of the redundancy 
Extracted the weekday from the **question_creation_date** and **answer_creation_date** and added two new columns:
**question_day**
**answer_day**
Extracted the hour and hour:minute from the **question_creation_date** and **answer_creation_date** and added four new columns
**question_hour**
**question_hour_min**
**answer_hour**
**answer_hour_min**
Subtracted the **answer_creation_date** from the **question_creation_date** (to calculate the duration between when an accepted answer was given to a question) and added a new column:
**accepted_answer_duration**
Removed data rows where **accepted_answer_duration** had a value of 0.000000
We used .groupby and counted 172 rows out of 46,885 
This could be due to a glitch in Stack Overflow as it’s impossible that an answer was given at the exact time a question was posted 
As these rows account for 0.367% of the merged DF, we decided to drop them
For our initial exploration into machine learning models, we created a subset of the DF and selected the following columns:
**accepted_answer_id**
**question_creation_date**
**question_day**
**question_hour**
**question_hour_min**
**accepted_answer_duration**

<p align ="center">
  <img src=https://github.com/smanowar/final-project/blob/main/Images/practice_ml_df.png>
  </p>

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

**insert image**
  
We therefore decided to reframe our question such that it can be analyzed using a classification model, reframing the question as:
  <p align="center">
  <i><b>"When a user posts a question, will they get an accepted answer within 24 hours?"</b></i> 
</p>
  
To explore this we decided to use a Random Forest Classifer and an Easy Ensemble Classifer and compared our results. 
The notebook used for this analysis can be found in: *insert path*.

### *Data Preprocessing and Feature Selection*

In order to maximize accuracy in the model, our data needed to be normalized and outliers accounted for. Due to the size of our data set, we resolved this by binning a number of columns to allow the data to better fit the machine learning model.

The tags column was parsed to count the number of tags versus having data in string format. 

Lastly, columns that were not relevant to the question were dropped and NANs were also dropped. The final set of our features are as follows:

- **q_title_char_count**: number of characters in the title of the question
- **q_title_word_count**: number of words in the title of the question	
- **q_body_word_count**: number of words in the body of the question
- **q_tags_count**: number of tags associated with the question
- **q_hour**: hour of the day the question was posted
- **q_score_tier**: score of the question
- **q_view_count**: how many views the question has
- **q_day**: day of the week the quesion was posted

Our reasoning for the selected columns are as follows:

- the body and character count were considered key for the model because intuitivley the length of a question would allow for a more detailed question. This clarity and specification would inturn help produce an accepted answer.

- Date Time columns were used to analyze how time of day affects the likelihood of getting an accepted answer. The number of users using Stack Overflow fluctuates based on the date and time of day. Therefore, the time and date a question is posted can affect the visibility of the question and can result in an answer being posted sooner. 

- Another variable that can affect the visibility of a question is the tags that are included in a question. For this reason, the “tags” column was also chosen as a feature. For simplicity, the specific tags associated with the question were converted to the number of tags associated with the question. 


### *Random Forest Classifier*

We intially chose to use a Random Forest Classifier for many reasons including:
- model is flexible to both classification and regression problems
- works well with both categorical and continuous values
- allows us to analyze the inputs using feature_importance to make decisions on feature selection to improve accuracy

The *accepted_answer_duration* column was originally classified into 3 categories: response in less than an hour, less than a day, greater than a day.

This yeilded an accuracy of 57%

**insert image**

To further increase accuracy the *accepted_answer_duration* was further consolidated into two categories: **less than 24 hours, and greater than 24 hours**. 

The results from the model are as follows:

**insert icr report**
**insert confusion matrix**

The model yeilded the following results:
- accuracy:
- precision:
- recall:

In attemps to increase accuracy we compare the results to an EasyEnsemble Classifer

### *EasyEnsemble Classifer*
The results from the model are as follows:

**insert icr report**
**insert confusion matrix**

The model yeilded:
- accuracy:
- precision:
- recall:

### Summary of Findings
Based on the results above we can see that the accuracy of both models differs by a percentage point - Random Forest at x% and EasyEnsemble at x%. The precision of both models also differ by a percentage point.

However, the run times for both models differed greaty. The Random Forest Classifier ran in about a minute, while the EasyEnsemble Classifier took about 30 minutes to run. For only yeilding a percentage point difference in accuracy it seems that Random Forest may be the most efficient choice.

Given more time, the next steps we would take would be to:
- increase data set size to see if accuracy improves further
- instead of the number of tags use the tags as categorical data
- take a look at data from the questions with no accepted answers and see how that may impact the results of our model

## **Communications protocols** 

- Each team member will have their own branch to this repository, named after their first names for clarity

    - **Saudia (*smanowar*) branch**: https://github.com/smanowar/final-project/tree/saudia

    - **Esther (*emc1518*) branch**: https://github.com/smanowar/final-project/tree/esther

    - **Suweatha (*ssanmug*) branch** : https://github.com/smanowar/final-project/tree/suweatha

    - **Nisha (*nishavenkatesh11*) branch**: https://github.com/smanowar/final-project/tree/nisha

- Each commit on a branch must include the following information in the comments:

  - Description of the update
  - Identify which component of the project it contributes to
  - Is the update complete or partial

