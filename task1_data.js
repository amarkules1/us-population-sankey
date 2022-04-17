const data = Papa.parse(`YEAR,emigration,immigration,deaths,births,TOTAL_POP
2017,14527,1011327,2667093,4053964,325511184
2018,15230,1016758,2696006,4075205,327891911
2019,16038,1021839,2723837,4094965,330268840
2020,17034,1026895,2751811,4112212,332639102
2021,18302,1032141,2780803,4126260,334998398
2022,20179,1037624,2811336,4137447,337341954
2023,22699,1043796,2843763,4145830,339665118
2024,25061,1049836,2878325,4151840,341963408
2025,27148,1057072,2915138,4156183,344234377
2026,28196,1069705,2954248,4159544,346481182
2027,30674,1078505,2995840,4161942,348695115
2028,33295,1086994,3039790,4162983,350872007
2029,36091,1095225,3085826,4162909,353008224
2030,39240,1103386,3133875,4162235,355100730
2031,42740,1111516,3183579,4161402,357147329
2032,46419,1119481,3234590,4160908,359146709
2033,49944,1127079,3286501,4161216,361098559
2034,53409,1134394,3338858,4162724,363003410
2035,57185,1141777,3391416,4165559,364862145
2036,61262,1149219,3443557,4169767,366676312
2037,65328,1156363,3494728,4175238,368447857
2038,69337,1163150,3544528,4181562,370178704
2039,73268,1169566,3592367,4188603,371871238
2040,77131,1175620,3637878,4196124,373527973
2041,81094,1181520,3680648,4204054,375151805
2042,84879,1186982,3720459,4212666,376746115
2043,88690,1192247,3757293,4221964,378314343
2044,92418,1197235,3790300,4231999,379860859
2045,96293,1202191,3819287,4242827,381390297
2046,99992,1206867,3844137,4254412,382907447
2047,103606,1211328,3866515,4266553,384415207
2048,106989,1215477,3885111,4279044,385917628
2049,110233,1219359,3899684,4291718,387418788
2050,113242,1222835,3910461,4304281,388922201
2051,116223,1226127,3917796,4316494,390430803
2052,119088,1229290,3922096,4328146,391947055
2053,121890,1232428,3923937,4339127,393472783
2054,124640,1235621,3923849,4349392,395009307
2055,127387,1238968,3922358,4358874,396557404
2056,130015,1242447,3919578,4367617,398117875
2057,132432,1245928,3916096,4375688,399690963
2058,134647,1249395,3912289,4383168,401276590
2059,136752,1252898,3908592,4390193,402874337
2060,138762,1256413,3905835,4396902,404483055`).data

function getData(beginYear, endYear){
    beginYearIndex = beginYear - 2016;
    endYearIndex = endYear - 2016;
    initPop = parseInt(data[beginYearIndex][5]);
    births = rowSum(beginYearIndex + 1, endYearIndex, 4);
    deaths = rowSum(beginYearIndex + 1, endYearIndex, 3);
    immigration = rowSum(beginYearIndex + 1, endYearIndex, 2);
    emigration = rowSum(beginYearIndex + 1, endYearIndex, 1);
    finalPop = (births + immigration + initPop) - (deaths + emigration)

    return {
        nodes: [
            {node: 0, name: "Births", cc:"#05A"},
            {node: 1, name: beginYear.toString() + " Population", cc:"#555"},
            {node: 2, name: "Immigrations", cc:"#29D"},

            {node: 3, name: " ", cc:"#555"},

            {node: 4, name: "Deaths", cc:"#A00"},
            {node: 5, name: "" + endYear.toString() + " Population", cc:"#555"},
            {node: 6, name: "Emigrations", cc:"#D22"}
        ],
        links: [
            {source: 0, target: 3, value: births, cc:"#15A"},
            {source: 1, target: 3, value: initPop, cc:"#999"},
            {source: 2, target: 3, value: immigration, cc:"#3AF"},

            {source: 3, target: 4, value: deaths, cc:"#B11"},
            {source: 3, target: 5, value: finalPop, cc:"#999"},
            {source: 3, target: 6, value: emigration, cc:"#F33"}
        ]
    }

    return {
        nodes:[
        {node:0,name:"node0"},
        {node:1,name:"node1"},
        {node:2,name:"node2"},
        {node:3,name:"node3"},
        {node:4,name:"node4"}
        ],
        links:[
        {source:0,target:2,value:2},
        {source:1,target:2,value:2},
        {source:1,target:3,value:2},
        {source:0,target:4,value:2},
        {source:2,target:3,value:2},
        {source:2,target:4,value:2},
        {source:3,target:4,value:4}
        ]}
}

function rowSum(beginIndex, endIndex, colIndex){
    var retVal = 0;
    for(var i = beginIndex; i < endIndex + 1; i++){
        retVal += parseInt(data[i][colIndex])
    }
    return retVal;
}
