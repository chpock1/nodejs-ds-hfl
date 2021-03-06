const Hapi = require('@hapi/hapi');
const ip = require("ip");

const init = async (configs) => {
    const host = ip.address() || configs.server.host;
    const port = process.env.PORT || configs.server.port;
    const server = new Hapi.Server({
        debug: { request: ['error'] },
        host:host,
        port: port,
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    });
    for(const plugin of configs.server.plugins){
        await require('./plugin/'+plugin).register(server,configs);
    }
    for(const module of configs.server.modules){
        await server.register(require('./api/'+module));
    }
    return server;
};
module.exports={init};


const natural = require('natural');

console.log(natural.JaroWinklerDistance("Москва", "fdsljldfkgdfg"));
console.log(natural.JaroWinklerDistance("Краснодарский край", "Краснодарский край"));

/*
20000415;"Россия, 140014, Московская обл, Люберецкий район, г. Люберцы, проезд Хлебозаводской, стр.31, офис ГСК ""НЕДРА"
20000416;"Россия, 141008, Московская область, г. Мытищи, Богослово, 2 км Северо-Западнее, СНТ ""Елочка"", д. 41, кв. 427"
20000417;"Россия, 141091, Московская область, 2 км Северо-Западнее, СНТ ""Елочка, г.Королев, с.Богослово, мкр. Первомайский, дом 47, кв. 144"
20000418;"Россия, 142000, Московская область, р-он: Ногинский, г Ногинск, ул. Индустриальная, дом 41""B"", оф. 197"
20000419;"Россия, 142005, Московская область, г. Домодедово,  мкр.Центральный, с. Богослово, 2 км Северо-Западнее, СНТ ""Елочка"", ул. Кирова, 7, 4, 400"
20000420;"Россия, 142033, Московская область, г.Домодедово, территория ""Пром.зона Житнево"", площадка №1, стр. 7Б"
20000421;"Россия, 142715, Ленинский р-он, Московская область, г ТЛПХ ""Вереск-В"", р-он: Ленинский, . Каштановая, дом 11"
20000422;"Россия, 142715, Московская область, с.Богослово, 2 км Северо-Западнее, СНТ ""Елочка"", Московская область, с Б"
20000423;"Россия, 143441, Московская область, Красногорский район, п/о Путилково, 69 км МКАД, ООК ЗАО ""ГРИНВУД"", стр.19, офис 32"

 */