import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const initialData = [
  { time: '2000-01-01', open: 150, high: 170, low: 130, close: 160 },
  { time: '2000-02-01', open: 160, high: 180, low: 140, close: 170 },
  { time: '2000-03-01', open: 170, high: 190, low: 150, close: 180 },
  { time: '2000-04-01', open: 180, high: 200, low: 160, close: 190 },
  { time: '2000-05-01', open: 190, high: 210, low: 170, close: 200 },
  { time: '2000-06-01', open: 200, high: 220, low: 180, close: 210 },
  { time: '2000-07-01', open: 210, high: 230, low: 190, close: 220 },
  { time: '2000-08-01', open: 220, high: 240, low: 200, close: 230 },
  { time: '2000-09-01', open: 230, high: 250, low: 210, close: 240 },
  { time: '2000-10-01', open: 240, high: 260, low: 220, close: 250 },
  { time: '2000-11-01', open: 250, high: 270, low: 230, close: 260 },
  { time: '2000-12-01', open: 260, high: 280, low: 240, close: 270 },
  
  { time: '2001-01-01', open: 260, high: 280, low: 240, close: 270 },
  { time: '2001-02-01', open: 270, high: 290, low: 250, close: 280 },
  { time: '2001-03-01', open: 280, high: 300, low: 260, close: 290 },
  { time: '2001-04-01', open: 290, high: 310, low: 270, close: 300 },
  { time: '2001-05-01', open: 300, high: 320, low: 280, close: 310 },
  { time: '2001-06-01', open: 310, high: 330, low: 290, close: 320 },
  { time: '2001-07-01', open: 320, high: 340, low: 300, close: 330 },
  { time: '2001-08-01', open: 330, high: 350, low: 310, close: 340 },
  { time: '2001-09-01', open: 340, high: 360, low: 320, close: 350 },
  { time: '2001-10-01', open: 350, high: 370, low: 330, close: 360 },
  { time: '2001-11-01', open: 360, high: 380, low: 340, close: 370 },
  { time: '2001-12-01', open: 370, high: 390, low: 350, close: 380 },
  
  { time: '2002-01-01', open: 370, high: 390, low: 350, close: 380 },
  { time: '2002-02-01', open: 380, high: 400, low: 360, close: 390 },
  { time: '2002-03-01', open: 390, high: 410, low: 370, close: 400 },
  { time: '2002-04-01', open: 400, high: 420, low: 380, close: 410 },
  { time: '2002-05-01', open: 410, high: 430, low: 390, close: 420 },
  { time: '2002-06-01', open: 420, high: 440, low: 400, close: 430 },
  { time: '2002-07-01', open: 430, high: 450, low: 410, close: 440 },
  { time: '2002-08-01', open: 440, high: 460, low: 420, close: 450 },
  { time: '2002-09-01', open: 450, high: 470, low: 430, close: 460 },
  { time: '2002-10-01', open: 460, high: 480, low: 440, close: 470 },
  { time: '2002-11-01', open: 470, high: 490, low: 450, close: 480 },
  { time: '2002-12-01', open: 480, high: 500, low: 460, close: 490 },

  { time: '2003-01-01', open: 180, high: 200, low: 160, close: 190 },
  { time: '2003-02-01', open: 190, high: 210, low: 170, close: 200 },
  { time: '2003-03-01', open: 200, high: 220, low: 180, close: 210 },
  { time: '2003-04-01', open: 210, high: 230, low: 190, close: 220 },
  { time: '2003-05-01', open: 220, high: 240, low: 200, close: 230 },
  { time: '2003-06-01', open: 230, high: 250, low: 210, close: 240 },
  { time: '2003-07-01', open: 240, high: 260, low: 220, close: 250 },
  { time: '2003-08-01', open: 250, high: 270, low: 230, close: 260 },
  { time: '2003-09-01', open: 260, high: 280, low: 240, close: 270 },
  { time: '2003-10-01', open: 270, high: 290, low: 250, close: 280 },
  { time: '2003-11-01', open: 280, high: 300, low: 260, close: 290 },
  { time: '2003-12-01', open: 290, high: 310, low: 270, close: 300 },

  { time: '2004-01-01', open: 290, high: 310, low: 270, close: 300 },
  { time: '2004-02-01', open: 300, high: 320, low: 280, close: 310 },
  { time: '2004-03-01', open: 310, high: 330, low: 290, close: 320 },
  { time: '2004-04-01', open: 320, high: 340, low: 300, close: 330 },
  { time: '2004-05-01', open: 330, high: 350, low: 310, close: 340 },
  { time: '2004-06-01', open: 340, high: 360, low: 320, close: 350 },
  { time: '2004-07-01', open: 350, high: 370, low: 330, close: 360 },
  { time: '2004-08-01', open: 360, high: 380, low: 340, close: 370 },
  { time: '2004-09-01', open: 370, high: 390, low: 350, close: 380 },
  { time: '2004-10-01', open: 380, high: 400, low: 360, close: 390 },
  { time: '2004-11-01', open: 390, high: 410, low: 370, close: 400 },
  { time: '2004-12-01', open: 400, high: 420, low: 380, close: 410 },

  { time: '2005-01-01', open: 400, high: 420, low: 380, close: 410 },
  { time: '2005-02-01', open: 410, high: 430, low: 390, close: 420 },
  { time: '2005-03-01', open: 420, high: 440, low: 400, close: 430 },
  { time: '2005-04-01', open: 430, high: 450, low: 410, close: 440 },
  { time: '2005-05-01', open: 440, high: 460, low: 420, close: 450 },
  { time: '2005-06-01', open: 450, high: 470, low: 430, close: 460 },
  { time: '2005-07-01', open: 460, high: 480, low: 440, close: 470 },
  { time: '2005-08-01', open: 470, high: 490, low: 450, close: 480 },
  { time: '2005-09-01', open: 480, high: 500, low: 460, close: 490 },
  { time: '2005-10-01', open: 490, high: 510, low: 470, close: 500 },
  { time: '2005-11-01', open: 500, high: 520, low: 480, close: 510 },
  { time: '2005-12-01', open: 510, high: 530, low: 490, close: 520 },

  { time: '2006-01-01', open: 510, high: 530, low: 490, close: 520 },
  { time: '2006-02-01', open: 520, high: 540, low: 500, close: 530 },
  { time: '2006-03-01', open: 530, high: 550, low: 510, close: 540 },
  { time: '2006-04-01', open: 540, high: 560, low: 520, close: 550 },
  { time: '2006-05-01', open: 550, high: 570, low: 530, close: 560 },
  { time: '2006-06-01', open: 560, high: 580, low: 540, close: 570 },
  { time: '2006-07-01', open: 570, high: 590, low: 550, close: 580 },
  { time: '2006-08-01', open: 580, high: 600, low: 560, close: 590 },
  { time: '2006-09-01', open: 590, high: 610, low: 570, close: 600 },
  { time: '2006-10-01', open: 600, high: 620, low: 580, close: 610 },
  { time: '2006-11-01', open: 610, high: 630, low: 590, close: 620 },
  { time: '2006-12-01', open: 620, high: 640, low: 600, close: 630 },

  { time: '2007-01-01', open: 620, high: 640, low: 600, close: 630 },
  { time: '2007-02-01', open: 630, high: 650, low: 610, close: 640 },
  { time: '2007-03-01', open: 640, high: 660, low: 620, close: 650 },
  { time: '2007-04-01', open: 650, high: 670, low: 630, close: 660 },
  { time: '2007-05-01', open: 660, high: 680, low: 640, close: 670 },
  { time: '2007-06-01', open: 670, high: 690, low: 650, close: 680 },
  { time: '2007-07-01', open: 680, high: 700, low: 660, close: 690 },
  { time: '2007-08-01', open: 690, high: 710, low: 670, close: 700 },
  { time: '2007-09-01', open: 700, high: 720, low: 680, close: 710 },
  { time: '2007-10-01', open: 710, high: 730, low: 690, close: 720 },
  { time: '2007-11-01', open: 720, high: 740, low: 700, close: 730 },
  { time: '2007-12-01', open: 730, high: 750, low: 710, close: 740 },

  { time: '2008-01-01', open: 730, high: 750, low: 710, close: 740 },
  { time: '2008-02-01', open: 740, high: 760, low: 720, close: 750 },
  { time: '2008-03-01', open: 750, high: 770, low: 730, close: 760 },
  { time: '2008-04-01', open: 760, high: 780, low: 740, close: 770 },
  { time: '2008-05-01', open: 770, high: 790, low: 750, close: 780 },
  { time: '2008-06-01', open: 780, high: 800, low: 760, close: 790 },
  { time: '2008-07-01', open: 790, high: 810, low: 770, close: 800 },
  { time: '2008-08-01', open: 800, high: 820, low: 780, close: 810 },
  { time: '2008-09-01', open: 810, high: 830, low: 790, close: 820 },
  { time: '2008-10-01', open: 820, high: 840, low: 800, close: 830 },
  { time: '2008-11-01', open: 830, high: 850, low: 810, close: 840 },
  { time: '2008-12-01', open: 840, high: 860, low: 820, close: 850 },

  { time: '2009-01-01', open: 840, high: 860, low: 820, close: 850 },
  { time: '2009-02-01', open: 850, high: 870, low: 830, close: 860 },
  { time: '2009-03-01', open: 860, high: 880, low: 840, close: 870 },
  { time: '2009-04-01', open: 870, high: 890, low: 850, close: 880 },
  { time: '2009-05-01', open: 880, high: 900, low: 860, close: 890 },
  { time: '2009-06-01', open: 890, high: 910, low: 870, close: 900 },
  { time: '2009-07-01', open: 900, high: 920, low: 880, close: 910 },
  { time: '2009-08-01', open: 910, high: 930, low: 890, close: 920 },
  { time: '2009-09-01', open: 920, high: 940, low: 900, close: 930 },
  { time: '2009-10-01', open: 930, high: 950, low: 910, close: 940 },
  { time: '2009-11-01', open: 940, high: 960, low: 920, close: 950 },
  { time: '2009-12-01', open: 950, high: 970, low: 930, close: 960 },

  { time: '2010-01-01', open: 950, high: 970, low: 930, close: 960 },
  { time: '2010-02-01', open: 960, high: 980, low: 940, close: 970 },
  { time: '2010-03-01', open: 970, high: 990, low: 950, close: 980 },
  { time: '2010-04-01', open: 980, high: 1000, low: 960, close: 990 },
  { time: '2010-05-01', open: 990, high: 1010, low: 970, close: 1000 },
  { time: '2010-06-01', open: 1000, high: 1020, low: 980, close: 1010 },
  { time: '2010-07-01', open: 1010, high: 1030, low: 990, close: 1020 },
  { time: '2010-08-01', open: 1020, high: 1040, low: 1000, close: 1030 },
  { time: '2010-09-01', open: 1030, high: 1050, low: 1010, close: 1040 },
  { time: '2010-10-01', open: 1040, high: 1060, low: 1020, close: 1050 },
  { time: '2010-11-01', open: 1050, high: 1070, low: 1030, close: 1060 },
  { time: '2010-12-01', open: 1060, high: 1080, low: 1040, close: 1070 },

  { time: '2011-01-01', open: 1060, high: 1080, low: 1040, close: 1070 },
  { time: '2011-02-01', open: 1070, high: 1090, low: 1050, close: 1080 },
  { time: '2011-03-01', open: 1080, high: 1100, low: 1060, close: 1090 },
  { time: '2011-04-01', open: 1090, high: 1110, low: 1070, close: 1100 },
  { time: '2011-05-01', open: 1100, high: 1120, low: 1080, close: 1110 },
  { time: '2011-06-01', open: 1110, high: 1130, low: 1090, close: 1120 },
  { time: '2011-07-01', open: 1120, high: 1140, low: 1100, close: 1130 },
  { time: '2011-08-01', open: 1130, high: 1150, low: 1110, close: 1140 },
  { time: '2011-09-01', open: 1140, high: 1160, low: 1120, close: 1150 },
  { time: '2011-10-01', open: 1150, high: 1170, low: 1130, close: 1160 },
  { time: '2011-11-01', open: 1160, high: 1180, low: 1140, close: 1170 },
  { time: '2011-12-01', open: 1170, high: 1190, low: 1150, close: 1180 },

  { time: '2012-01-01', open: 1170, high: 1190, low: 1150, close: 1180 },
  { time: '2012-02-01', open: 1180, high: 1200, low: 1160, close: 1190 },
  { time: '2012-03-01', open: 1190, high: 1210, low: 1170, close: 1200 },
  { time: '2012-04-01', open: 1200, high: 1220, low: 1180, close: 1210 },
  { time: '2012-05-01', open: 1210, high: 1230, low: 1190, close: 1220 },
  { time: '2012-06-01', open: 1220, high: 1240, low: 1200, close: 1230 },
  { time: '2012-07-01', open: 1230, high: 1250, low: 1210, close: 1240 },
  { time: '2012-08-01', open: 1240, high: 1260, low: 1220, close: 1250 },
  { time: '2012-09-01', open: 1250, high: 1270, low: 1230, close: 1260 },
  { time: '2012-10-01', open: 1260, high: 1280, low: 1240, close: 1270 },
  { time: '2012-11-01', open: 1270, high: 1290, low: 1250, close: 1280 },
  { time: '2012-12-01', open: 1280, high: 1300, low: 1260, close: 1290 },

  { time: '2013-01-01', open: 1280, high: 1300, low: 1260, close: 1290 },
  { time: '2013-02-01', open: 1290, high: 1310, low: 1270, close: 1300 },
  { time: '2013-03-01', open: 1300, high: 1320, low: 1280, close: 1310 },
  { time: '2013-04-01', open: 1310, high: 1330, low: 1290, close: 1320 },
  { time: '2013-05-01', open: 1320, high: 1340, low: 1300, close: 1330 },
  { time: '2013-06-01', open: 1330, high: 1350, low: 1310, close: 1340 },
  { time: '2013-07-01', open: 1340, high: 1360, low: 1320, close: 1350 },
  { time: '2013-08-01', open: 1350, high: 1370, low: 1330, close: 1360 },
  { time: '2013-09-01', open: 1360, high: 1380, low: 1340, close: 1370 },
  { time: '2013-10-01', open: 1370, high: 1390, low: 1350, close: 1380 },
  { time: '2013-11-01', open: 1380, high: 1400, low: 1360, close: 1390 },
  { time: '2013-12-01', open: 1390, high: 1410, low: 1370, close: 1400 },

  { time: '2014-01-01', open: 1390, high: 1410, low: 1370, close: 1400 },
  { time: '2014-02-01', open: 1400, high: 1420, low: 1380, close: 1410 },
  { time: '2014-03-01', open: 1410, high: 1430, low: 1390, close: 1420 },
  { time: '2014-04-01', open: 1420, high: 1440, low: 1400, close: 1430 },
  { time: '2014-05-01', open: 1430, high: 1450, low: 1410, close: 1440 },
  { time: '2014-06-01', open: 1440, high: 1460, low: 1420, close: 1450 },
  { time: '2014-07-01', open: 1450, high: 1470, low: 1430, close: 1460 },
  { time: '2014-08-01', open: 1460, high: 1480, low: 1440, close: 1470 },
  { time: '2014-09-01', open: 1470, high: 1490, low: 1450, close: 1480 },
  { time: '2014-10-01', open: 1480, high: 1500, low: 1460, close: 1490 },
  { time: '2014-11-01', open: 1490, high: 1510, low: 1470, close: 1500 },
  { time: '2014-12-01', open: 1500, high: 1520, low: 1480, close: 1510 },

  { time: '2015-01-01', open: 1500, high: 1520, low: 1480, close: 1510 },
  { time: '2015-02-01', open: 1510, high: 1530, low: 1490, close: 1520 },
  { time: '2015-03-01', open: 1520, high: 1540, low: 1500, close: 1530 },
  { time: '2015-04-01', open: 1530, high: 1550, low: 1510, close: 1540 },
  { time: '2015-05-01', open: 1540, high: 1560, low: 1520, close: 1550 },
  { time: '2015-06-01', open: 1550, high: 1570, low: 1530, close: 1560 },
  { time: '2015-07-01', open: 1560, high: 1580, low: 1540, close: 1570 },
  { time: '2015-08-01', open: 1570, high: 1590, low: 1550, close: 1580 },
  { time: '2015-09-01', open: 1580, high: 1600, low: 1560, close: 1590 },
  { time: '2015-10-01', open: 1590, high: 1610, low: 1570, close: 1600 },
  { time: '2015-11-01', open: 1600, high: 1620, low: 1580, close: 1610 },
  { time: '2015-12-01', open: 1610, high: 1630, low: 1590, close: 1620 },

  { time: '2016-01-01', open: 1610, high: 1630, low: 1590, close: 1620 },
  { time: '2016-02-01', open: 1620, high: 1640, low: 1600, close: 1630 },
  { time: '2016-03-01', open: 1630, high: 1650, low: 1610, close: 1640 },
  { time: '2016-04-01', open: 1640, high: 1660, low: 1620, close: 1650 },
  { time: '2016-05-01', open: 1650, high: 1670, low: 1630, close: 1660 },
  { time: '2016-06-01', open: 1660, high: 1680, low: 1640, close: 1670 },
  { time: '2016-07-01', open: 1670, high: 1690, low: 1650, close: 1680 },
  { time: '2016-08-01', open: 1680, high: 1700, low: 1660, close: 1690 },
  { time: '2016-09-01', open: 1690, high: 1710, low: 1670, close: 1700 },
  { time: '2016-10-01', open: 1700, high: 1720, low: 1680, close: 1710 },
  { time: '2016-11-01', open: 1710, high: 1730, low: 1690, close: 1720 },
  { time: '2016-12-01', open: 1720, high: 1740, low: 1700, close: 1730 },

  { time: '2017-01-01', open: 1720, high: 1740, low: 1700, close: 1730 },
  { time: '2017-02-01', open: 1730, high: 1750, low: 1710, close: 1740 },
  { time: '2017-03-01', open: 1740, high: 1760, low: 1720, close: 1750 },
  { time: '2017-04-01', open: 1750, high: 1770, low: 1730, close: 1760 },
  { time: '2017-05-01', open: 1760, high: 1780, low: 1740, close: 1770 },
  { time: '2017-06-01', open: 1770, high: 1790, low: 1750, close: 1780 },
  { time: '2017-07-01', open: 1780, high: 1800, low: 1760, close: 1790 },
  { time: '2017-08-01', open: 1790, high: 1810, low: 1770, close: 1800 },
  { time: '2017-09-01', open: 1800, high: 1820, low: 1780, close: 1810 },
  { time: '2017-10-01', open: 1810, high: 1830, low: 1790, close: 1820 },
  { time: '2017-11-01', open: 1820, high: 1840, low: 1800, close: 1830 },
  { time: '2017-12-01', open: 1830, high: 1850, low: 1810, close: 1840 },

  { time: '2018-01-01', open: 1830, high: 1850, low: 1810, close: 1840 },
  { time: '2018-02-01', open: 1840, high: 1860, low: 1820, close: 1850 },
  { time: '2018-03-01', open: 1850, high: 1870, low: 1830, close: 1860 },
  { time: '2018-04-01', open: 1860, high: 1880, low: 1840, close: 1870 },
  { time: '2018-05-01', open: 1870, high: 1890, low: 1850, close: 1880 },
  { time: '2018-06-01', open: 1880, high: 1900, low: 1860, close: 1890 },
  { time: '2018-07-01', open: 1890, high: 1910, low: 1870, close: 1900 },
  { time: '2018-08-01', open: 1900, high: 1920, low: 1880, close: 1910 },
  { time: '2018-09-01', open: 1910, high: 1930, low: 1890, close: 1920 },
  { time: '2018-10-01', open: 1920, high: 1940, low: 1900, close: 1930 },
  { time: '2018-11-01', open: 1930, high: 1950, low: 1910, close: 1940 },
  { time: '2018-12-01', open: 1940, high: 1960, low: 1920, close: 1950 },

  { time: '2019-01-01', open: 1940, high: 1960, low: 1920, close: 1950 },
  { time: '2019-02-01', open: 1950, high: 1970, low: 1930, close: 1960 },
  { time: '2019-03-01', open: 1960, high: 1980, low: 1940, close: 1970 },
  { time: '2019-04-01', open: 1970, high: 1990, low: 1950, close: 1980 },
  { time: '2019-05-01', open: 1980, high: 2000, low: 1960, close: 1990 },
  { time: '2019-06-01', open: 1990, high: 2010, low: 1970, close: 2000 },
  { time: '2019-07-01', open: 2000, high: 2020, low: 1980, close: 2010 },
  { time: '2019-08-01', open: 2010, high: 2030, low: 1990, close: 2020 },
  { time: '2019-09-01', open: 2020, high: 2040, low: 2000, close: 2030 },
  { time: '2019-10-01', open: 2030, high: 2050, low: 2010, close: 2040 },
  { time: '2019-11-01', open: 2040, high: 2060, low: 2020, close: 2050 },
  { time: '2019-12-01', open: 2050, high: 2070, low: 2030, close: 2060 },

  { time: '2020-01-01', open: 2050, high: 2070, low: 2030, close: 2060 },
  { time: '2020-02-01', open: 2060, high: 2080, low: 2040, close: 2070 },
  { time: '2020-03-01', open: 2070, high: 2090, low: 2050, close: 2080 },
  { time: '2020-04-01', open: 2080, high: 2100, low: 2060, close: 2090 },
  { time: '2020-05-01', open: 2090, high: 2110, low: 2070, close: 2100 },
  { time: '2020-06-01', open: 2100, high: 2120, low: 2080, close: 2110 },
  { time: '2020-07-01', open: 2110, high: 2130, low: 2090, close: 2120 },
  { time: '2020-08-01', open: 2120, high: 2140, low: 2100, close: 2130 },
  { time: '2020-09-01', open: 2130, high: 2150, low: 2110, close: 2140 },
  { time: '2020-10-01', open: 2140, high: 2160, low: 2120, close: 2150 },
  { time: '2020-11-01', open: 2150, high: 2170, low: 2130, close: 2160 },
  { time: '2020-12-01', open: 2160, high: 2180, low: 2140, close: 2170 },

  { time: '2021-01-01', open: 2160, high: 2180, low: 2140, close: 2170 },
  { time: '2021-02-01', open: 2170, high: 2190, low: 2150, close: 2180 },
  { time: '2021-03-01', open: 2180, high: 2200, low: 2160, close: 2190 },
  { time: '2021-04-01', open: 2190, high: 2210, low: 2170, close: 2200 },
  { time: '2021-05-01', open: 2200, high: 2220, low: 2180, close: 2210 },
  { time: '2021-06-01', open: 2210, high: 2230, low: 2190, close: 2220 },
  { time: '2021-07-01', open: 2220, high: 2240, low: 2200, close: 2230 },
  { time: '2021-08-01', open: 2230, high: 2250, low: 2210, close: 2240 },
  { time: '2021-09-01', open: 2240, high: 2260, low: 2220, close: 2250 },
  { time: '2021-10-01', open: 2250, high: 2270, low: 2230, close: 2260 },
  { time: '2021-11-01', open: 2260, high: 2280, low: 2240, close: 2270 },
  { time: '2021-12-01', open: 2270, high: 2290, low: 2250, close: 2280 },

  { time: '2022-01-01', open: 2270, high: 2290, low: 2250, close: 2280 },
  { time: '2022-02-01', open: 2280, high: 2300, low: 2260, close: 2290 },
  { time: '2022-03-01', open: 2290, high: 2310, low: 2270, close: 2300 },
  { time: '2022-04-01', open: 2300, high: 2320, low: 2280, close: 2310 },
  { time: '2022-05-01', open: 2310, high: 2330, low: 2290, close: 2320 },
  { time: '2022-06-01', open: 2320, high: 2340, low: 2300, close: 2330 },
  { time: '2022-07-01', open: 2330, high: 2350, low: 2310, close: 2340 },
  { time: '2022-08-01', open: 2340, high: 2360, low: 2320, close: 2350 },
  { time: '2022-09-01', open: 2350, high: 2370, low: 2330, close: 2360 },
  { time: '2022-10-01', open: 2360, high: 2380, low: 2340, close: 2370 },
  { time: '2022-11-01', open: 2370, high: 2390, low: 2350, close: 2380 },
  { time: '2022-12-01', open: 2380, high: 2400, low: 2360, close: 2390 },

  { time: '2023-01-01', open: 1150, high: 1600, low: 1100, close: 1500 },
  { time: '2023-02-01', open: 1500, high: 1600, low: 1400, close: 1550 },
  { time: '2023-03-01', open: 1550, high: 1650, low: 1450, close: 1600 },
  { time: '2023-04-01', open: 1600, high: 1700, low: 1500, close: 1650 },
  { time: '2023-05-01', open: 1650, high: 1750, low: 1550, close: 1700 },
  { time: '2023-06-01', open: 1700, high: 1800, low: 1600, close: 1750 },
  { time: '2023-07-01', open: 1750, high: 1850, low: 1650, close: 1800 },
  { time: '2023-08-01', open: 1800, high: 1900, low: 1700, close: 1850 },
  { time: '2023-09-01', open: 1850, high: 1950, low: 1750, close: 1900 },
  { time: '2023-10-01', open: 1900, high: 2000, low: 1800, close: 1950 },
  { time: '2023-11-01', open: 1950, high: 2050, low: 1850, close: 2000 },
  { time: '2023-12-01', open: 2000, high: 2100, low: 1900, close: 2050 },

  { time: '2024-01-01', open: 1500, high: 1550, low: 1200, close: 1246.30 },
  { time: '2024-02-01', open: 1246.30, high: 1300, low: 1150, close: 1250 },
  { time: '2024-03-01', open: 1250, high: 1350, low: 1200, close: 1300 },
  { time: '2024-04-01', open: 1300, high: 1400, low: 1250, close: 1350 },
  { time: '2024-05-01', open: 1350, high: 1450, low: 1300, close: 1400 },
  { time: '2024-06-01', open: 1400, high: 1500, low: 1350, close: 1450 },
  { time: '2024-07-01', open: 1450, high: 1550, low: 1400, close: 1500 },
  { time: '2024-08-01', open: 1500, high: 1600, low: 1450, close: 1550 },
  { time: '2024-09-01', open: 1550, high: 1650, low: 1500, close: 1600 },
  { time: '2024-10-01', open: 1600, high: 1700, low: 1550, close: 1650 },
  { time: '2024-11-01', open: 1650, high: 1750, low: 1600, close: 1700 },
  { time: '2024-12-01', open: 1700, high: 1800, low: 1650, close: 1750 },
];



const CandleStickStockChart = ({ selectedPeriod }) => {
  const chartContainerRef = useRef(null);
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [hoveredVolume, setHoveredVolume] = useState(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        attributionLogo: false,
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#333333',
        fontSize: 12,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      watermark: {
        visible: false, // Disable any watermark
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 480,
    }

    const chart = createChart(chartContainerRef.current, chartOptions);

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(initialData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const volumeData = initialData.map(item => ({
      time: item.time,
      value: Math.random() * 100000000,
      color: item.close > item.open ? '#26a69a' : '#ef5350'
    }));

    volumeSeries.setData(volumeData);

    // Add price and volume tooltips
    chart.subscribeCrosshairMove(param => {
      if (param.time) {
        const data = initialData.find(d => d.time === param.time);
        if (data) {
          setHoveredPrice(`₹${data.close.toFixed(2)}`);
          const volume = volumeData.find(d => d.time === param.time);
          if (volume) {
            setHoveredVolume(`${(volume.value / 1000000).toFixed(2)}M`);
          }
        }
      } else {
        setHoveredPrice(null);
        setHoveredVolume(null);
      }
    });

    // Make chart responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedPeriod]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full" />
      {hoveredPrice && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
          <div className="text-sm font-medium">{hoveredPrice}</div>
          {hoveredVolume && (
            <div className="text-xs text-gray-500">Vol: {hoveredVolume}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CandleStickStockChart;
