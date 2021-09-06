# Final Project: First Segment Project Deliverable

## Selected Topic: Stack Overflow Response Analysis

## Overview

  As students who use stack overflow as a learning tool, we want data on the best times to be online and post our questions to get an approved answer quickly and keep our momentum as we learn. The purpose of this project is to determine the relationships between the features on Stack Overflow such as time of day, tags, question creation date in order to help users make the most of their studying time.

## Questions we hope to answer

- What are factors that lead to short times to approved answers?
- What is the mean time between question and approved answer?
- What is the median time between question and approved answer?
- What are the top ten times of day where the most questions are posed?
- What are the top ten times of day where the most approved answers are provided?
- What times of each day sees response rates of less than an hour?
- What is the mean time between question and approved answer by tag?
- What is the median time between question and approved answer by tag?
- What is the correlation between tag popularity and time to an approved answer?
- What is the correlation between the number of tags and time to an approved answer? 
- Do the number of tags impact the number of approved responses?
- What is the correlation between the badged questions and time to an approved answer?

## Exploratory Data Analysis

The data was obtained from Google Could Marketplace() and Kaggle(link). 



  


**erd image here**

## Machine Learning Component
### Provisional Machine Learning Model

The question we hope to answer with the machine learning component of our project is:
<p align="center">
<i>"What are factors that lead to short times to approved answers?"</i> 
</p>
In order to determine the most appropriate model for the Stack Overflow data, we exlpored relationships between various features within the data and the estimated response time. 

By using a regression model we established that there was no correlation between the features that were used in the regression model. The notebook used for the analysis is *ML_deliverable1_convert_to_int.ipynb*. Our results are summarized below.

We arrived at this conclusion via the following steps:

- We used a transformation function to convert data type of column *question_day* from object to integer in ordere to make the data compatible with the sklearn library:

[insert images]

- We then modeled the data using a regression analysis on the features *question_hour* to see if any correlation exists:

[insert images]

As seen in the image above the line of best fit is a vertical line indicating no correlation between time of day and accepted answer duration.

We then decided try the analysis again with data that is more continuous to see if we could get a more precise outcome. To do so we modeled the data to see if there was a relationship between the minute of the day the question was asked and the accepted answer duration.

-Firstly we transformed the column *question_hour_min* to parse only the minute amount

[insert image]

- We then created the column *question_time* using the function below:

[insert function]

By multiplying the hour the question was asked (*question_hour*) and adding the minutes (*question_hour_minute*) to it we obtained the minute of the day. Note that *question_hour* is measured in military time.

- We then performed a similar regression analysis on the new feature:

[insert images]

We found no change in correlation. Based on our findings moving forward in the project we will 

- explore the relationship between other features in the data set and accepted answer duration.
- refine the question we wish for our machine learning model to explore
- explore other machine learning models that can yeild better results for what we are trying to investigate

## **Communications protocols** 

- Each team member will have their own branch to this repository, named after their first names for clarity

    - Saudia (smanowar) branch: https://github.com/smanowar/final-project/tree/saudia

    - Esther (emc1518) branch: https://github.com/smanowar/final-project/tree/esther

    - Suweatha (ssanmug) branch : https://github.com/smanowar/final-project/tree/suweatha

    - Nisha (nishavenkatesh11) branch: https://github.com/smanowar/final-project/tree/nisha

- Each commit on a branch must include the following information in the comments:

  - Description of the update
  - Identify which component of the project it contributes to
  - Is the update complete or partial

