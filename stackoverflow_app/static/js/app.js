
/*code for the feature importance bar graph*/
var feature_importance = [
  {
    y: ['q_hour', 'q_tags_count', 'q_body_len_bin_500-10000',
    'q_body_len_bin_250-500','q_day_Friday','q_body_len_bin_50-100',
    'q_title_word_count_bin_Short (0 - 10)','q_title_word_count_bin_Medium (10-20)',
    'q_day_Wednesday','q_body_len_bin_100-250','q_day_Thursday',
    'q_day_Monday','q_day_Saturday','q_day_Tuesday','q_title_word_count_bin_Long (20-30)',
    'q_day_Sunday','q_body_len_bin_<50','q_title_word_count_bin_XL (30+)'],
    x: [0.6448099311012391,0.15952956319103145,0.030754420450241828,
      0.02255523109476319,0.017754638309173856,0.016938711743055102,
      0.012897456760070442,0.012591943934120229,0.009981839334289895,
      0.009796000398893046,0.00965609382440849,0.00952906359147217,
      0.009190572168048906,0.00918473984574853,0.008944454467710064,
      0.008418534047194514,0.007151594451761099,0.0003152112867781374],
    type: 'bar',
    orientation: 'h',
    text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E']
  }
];

var layout = {
  title:"Feature Importance",
  yaxis:{automargin: true,
  tickfont:{size:10}}

};

Plotly.newPlot('featuresPlot', feature_importance, layout);


//ml timeline chart

//var lineData = [{
//  x: ["Attempt1: Linear Regression", "Attempt 2: Random Forest Classifier", "Attempt 3: Random Forest with expanded data","Attempt 4: Easy Ensemble Classifier" , "Attempt 5:Logistic Regression", "Final Model Selection: Random Forest"],
//  y: ["2021-09-05", "2021-09-08", "2021-09-12", "2021-09-15", "2021-09-19", "2021-09-20"],
//  text: ["Linear Regression Model produced only 1% accuracy", "Random Forest Classifier improved accuracy to 43%", "Accuracy further improved to 58% then 61% by expanding data", "Easy Ensemble Classifier improved accuracy to 63% but long run time was not worth the improvement", "Logistic Regression Model improved accuracy to 86% but model was overfitting data", "Settled on Random Forest Model because of accuracy and overall ease of use "],
//  type:"Scatter"
//}];

//var layout = {
// title: "Machine Learning Model Selection Process"
//};

//Plotly.newPlot('lineChart', lineData, layout);

/*code for the feature importance bar graph*/
var model_results = [
  {
    x: ["Correct Prediction", "Incorrect Prediction"],
    y: [56,44],
    type: 'bar',
   // orientation: 'h',
    text: ['Text A', 'Text B']
  }
];

var layout = {
  title:"Test",
  yaxis:{automargin: true,
  tickfont:{size:10}}

};

Plotly.newPlot('confusionMatrix', model_results, layout);