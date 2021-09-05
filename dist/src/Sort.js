var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sortForParam = void 0;
    // datテキストソート基準
    var sortForParam = function (a, b) {
        var _a = __read([
            a.isComment ? SORT_KEYS.comment : SORT_KEYS[a.keyVal] || SORT_KEYS.unknown,
            b.isComment ? SORT_KEYS.comment : SORT_KEYS[b.keyVal] || SORT_KEYS.unknown
        ], 2), oa = _a[0], ob = _a[1];
        return oa - ob;
    };
    exports.sortForParam = sortForParam;
    // dat書き出し時の項目ソート順定義
    var SORT_KEYS = {
        // コメント
        comment: 0,
        // 不明
        unknown: 10000,
        // 一般
        obj: 1,
        name: 2,
        copyright: 3,
        intro_month: 10,
        intro_year: 11,
        retire_month: 20,
        retire_year: 21,
        // 金額関係
        cost: 100,
        maintenance: 101,
        runningcost: 102,
        // 建物
        type: 1000,
        dims: 1010,
        level: 1020,
        passengers: 1030,
        location: 1040,
        enables_pax: 1050,
        enables_post: 1051,
        enables_ware: 1052,
        extension_building: 1060,
        needs_ground: 1070,
        noconstruction: 1080,
        noinfo: 1090,
        allow_underground: 1110,
        build_time: 1120,
        chance: 1130,
        clusters: 1140,
        hq_level: 1150,
        // 工場
        distributionweight: 2000,
        productivity: 2010,
        range: 2020,
        inputgood: 2030,
        inputcapacity: 2031,
        inputfactor: 2032,
        inputsupplier: 2033,
        outputgood: 2040,
        outputcapacity: 2041,
        outputfactor: 2042,
        pax_level: 2050,
        expand_probability: 2070,
        expand_minimum: 2071,
        expand_range: 2072,
        expand_times: 2073,
        electricity_boost: 2080,
        passenger_boost: 2081,
        mail_boost: 2082,
        electricity_amount: 2090,
        passenger_demand: 2100,
        mail_demand: 2101,
        smoke: 2110,
        smoketile: 2111,
        smokeoffset: 2112,
        smokespeed: 2113,
        fields: 2120,
        has_snow: 2121,
        min_fields: 2122,
        max_fields: 2123,
        production_per_field: 2124,
        probability_to_spawn: 2125,
        storage_capacity: 2126,
        spawn_weight: 2127,
        start_fields: 2128,
        // 車両
        waytype: 3000,
        engine_type: 3010,
        freight: 3020,
        payload: 3030,
        speed: 3040,
        gear: 3050,
        weight: 3060,
        power: 3070,
        loading_time: 3080,
        length: 3090,
        sound: 3100,
        constraint: 3110,
        freightimagetype: 3120,
        // 信号
        min_speed: 4000,
        single_way: 4010,
        free_route: 4020,
        is_private: 4030,
        is_signal: 4040,
        is_presignal: 4050,
        is_longblocksignal: 4060,
        is_prioritysignal: 4070,
        end_of_choose: 4080,
        offset_left: 4090,
        // 軌道
        system_type: 5000,
        topspeed: 5010,
        draw_as_ding: 5020,
        max_weight: 5030,
        max_height: 5040,
        max_length: 5050,
        own_waytype: 5060,
        pillar_asymmetric: 5070,
        pillar_distance: 5080,
        // 木
        height: 6000,
        seasons: 6010,
        // 貨物
        metric: 7000,
        catg: 7010,
        value: 7020,
        speed_bonus: 7030,
        weight_per_unit: 7040,
        mapcolor: 7050,
        // その他
        trees_on_top: 8000,
        climates: 8010,
        // カーソル・アイコン
        cursor: 90000,
        icon: 90010,
        // 画像
        image: 90100,
        backimage: 90101,
        frontimage: 90102,
        emptyimage: 90103,
        freightimage: 90104,
        // 斜め
        diagonal: 90200,
        backdiagonal: 90201,
        frontdiagonal: 90202,
        // 傾斜
        imageup: 90300,
        backimageup: 90301,
        frontimageup: 90302,
        imageup2: 90310,
        backimageup2: 90311,
        frontimageup2: 90312,
        // 橋
        backimage2: 90401,
        frontimage2: 90402,
        backramp: 90411,
        frontramp: 90412,
        backramp2: 90421,
        frontramp2: 90422,
        backstart: 90431,
        frontstart: 90432,
        backstart2: 90441,
        frontstart2: 90442,
        backpillar: 90451,
        frontpillar: 90452,
        backpillar2: 90461,
        frontpillar2: 90462,
        // 踏切
        openimage: 90500,
        closedimage: 90501,
        front_openimage: 90510,
        front_closedimage: 90511,
    };
});