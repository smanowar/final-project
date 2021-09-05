# Final Project: Analyzing StackOverflow Messageboard Data

## Machine Learning Component
### *Unsupervised Learning - Clustering using the K-Means Algorithm*

For the machine learning component of this project we have decided to use clustering using the k-means algorithm to analyze our data.

We opted for an unsupervised machine learning model as the initial question we wanted to answer was: 
<p align ="center">
<i>"What time of day and day of the week are questions most likley to get an approved response?"</i>
</p>

We found this question to be a little too complex for the models we have covered in this course, therefore we decided to use a clustering model to observe similarities between posts with approved answers. 

Alternativley, we can use a clustering model on questions with no approved answers in order to see what large similarities exist in unapproved answers - allowing the moderators of the board to make recommendations to those posting as to what may help with getting an approved answer or allow the website to see where they need to focus / what adjustments need to be made in order to get answers approved.

The features we plan to focus on are: tags, size of question posed, time of day question was asked, and day of the week question was asked.

### **Steps to take:**

**1. Import Dependencies**<br>
- sklearn libraries<br>
- pandas and hv.plot<br>
- path<br>
- plotly<br>

**2. Clean/Prep Data for Analysis**<br>
- drop necessary columns<br>
- join tables <br>
- use get_dummies() or use a numerical transformation on text features <br>
- standardize data using StandardScaler()<br>

**3. (tentative) Use PCA to Reduce Dimensions**

**4. Implement Clustering Algorithm using K-Means**

**5. Plot Results**


