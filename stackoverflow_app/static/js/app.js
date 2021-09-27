function buildPlot() {

    /* data route */
  const url = "/api/pals";
  d3.json(url).then(function(response) {

    console.log(response);

    const data = response;

    const layout = {
      scope: "canada",
      title: "Pet Pals",
      showlegend: false,
      height: 600,
            // width: 980,
      geo: {
        scope: "usa",
        projection: {
          type: "albers usa"
        },
        showland: true,
        landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();

/*code for the feature importance bar graph*/
var data = [
  {
    x: ['q_hour', 'q_tags_count', 'q_body_len_bin_500-10000',
    'q_body_len_bin_250-500','q_day_Friday','q_body_len_bin_50-100',
    'q_title_word_count_bin_Short (0 - 10)','q_title_word_count_bin_Medium (10-20)',
    'q_day_Wednesday','q_body_len_bin_100-250','q_day_Thursday',
    'q_day_Monday','q_day_Saturday','q_day_Tuesday','q_title_word_count_bin_Long (20-30)',
    'q_day_Sunday','q_body_len_bin_<50','q_title_word_count_bin_XL (30+)'],
    y: [0.6448099311012391,0.15952956319103145,0.030754420450241828,
      0.02255523109476319,0.017754638309173856,0.016938711743055102,
      0.012897456760070442,0.012591943934120229,0.009981839334289895,
      0.009796000398893046,0.00965609382440849,0.00952906359147217,
      0.009190572168048906,0.00918473984574853,0.008944454467710064,
      0.008418534047194514,0.007151594451761099,0.0003152112867781374],
    type: 'bar'
  }
];

Plotly.newPlot('featuresPlot', data);
