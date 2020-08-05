require('./js/application.js');

require('./css/style.css');
require('./css/style-mobile.css');
require('./css/hamburgers.css');

require.context("./", true, /\.(?!(css|js|html)$)/);