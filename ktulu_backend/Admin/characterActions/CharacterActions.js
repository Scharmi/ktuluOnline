const { dziwka } = require("./characters/dziwka");
const { szeryf } = require("./characters/szeryf");
const { pastor } = require("./characters/pastor");
const { hazardzista } = require("./characters/hazardzista");
const { hazardzistaKilling } = require("./characters/hazardzistaKilling");
const { opoj } = require("./characters/opoj");
const { kat } = require("./characters/kat");
const { uwodziciel } = require("./characters/uwodziciel");
const { bandyciInspection } = require("./characters/bandyciInspection");
const { bandyciStatue } = require("./characters/bandyciStatue");
const { bandyciSendInfo } = require("./characters/bandyciSendInfo");
const { msciciel } = require("./characters/msciciel");
const { zlodziej } = require("./characters/zlodziej");
const { szuler } = require("./characters/szuler");
const { indianieKilling } = require("./characters/indianieKilling");
const { indianieStatue } = require("./characters/indianieStatue");
const { indianieSendInfo } = require("./characters/indianieSendInfo");
const { szamanka } = require("./characters/szamanka");
const { szaman } = require("./characters/szaman");
const { wojownik } = require("./characters/wojownik");
const { samotnyKojot } = require("./characters/samotnyKojot");
const { lornecieOko } = require("./characters/lornecieOko");
const { szantazysta } = require("./characters/szantazysta");
const { plonacySzal } = require("./characters/plonacySzal");
const { duelsTurn } = require("./characters/duelsTurn");
const { chooseVoted } = require("./characters/chooseVoted");
const { inspection } = require("./characters/inspection");
const { isHanging } = require("./characters/isHanging");
const { hanging } = require("./characters/hanging");
const { setDay } = require("./characters/setDay");
const { setNight } = require("./characters/setNight");
const { indianieChatEnable } = require("./characters/indianieChatEnable");
const { bandyciChatEnable } = require("./characters/bandyciChatEnable");
const { indianieChatDisable } = require("./characters/indianieChatDisable");
const { bandyciChatDisable  } = require("./characters/bandyciChatDisable");

exports.characterActions = {
    dziwka: dziwka,
    pastor: pastor,
    szeryf: szeryf,
    opoj: opoj,
    uwodziciel: uwodziciel,
    hazardzista: hazardzista,
    hazardzistaKilling: hazardzistaKilling,
    kat: kat,
    bandyciInspection: bandyciInspection,
    bandyciStatue: bandyciStatue,
    bandyciSendInfo: bandyciSendInfo,
    msciciel: msciciel,
    zlodziej: zlodziej,
    szuler: szuler,
    szantazysta: szantazysta,
    indianieSendInfo: indianieSendInfo,
    indianieKilling: indianieKilling,
    indianieStatue: indianieStatue,
    wojownik: wojownik,
    szamanka: szamanka,
    szaman: szaman,
    samotnyKojot: samotnyKojot,
    lornecieOko: lornecieOko,
    plonacySzal: plonacySzal,
    duelsTurn: duelsTurn,
    chooseVoted: chooseVoted,
    inspection: inspection,
    isHanging: isHanging,
    hanging: hanging,
    setDay: setDay,
    setNight: setNight,
    bandyciChatEnable: bandyciChatEnable,
    bandyciChatDisable: bandyciChatDisable,
    indianieChatEnable: indianieChatEnable,
    indianieChatDisable: indianieChatDisable,
}