import { dziwka } from './characters/dziwka'
import { szeryf } from './characters/szeryf'
import { pastor } from './characters/pastor'
import { uwodziciel } from './characters/uwodziciel'
import { hazardzista } from './characters/hazardzista'
import { opoj } from './characters/opoj'
import { hazardzistaKilling } from './characters/hazardzistaKilling'
import { bandyciInspection } from './characters/bandyciInspection'
import { kat } from './characters/kat'
import { bandyciStatue } from './characters/bandyciStatue'
import { msciciel } from './characters/msciciel'
import { zlodziej } from './characters/zlodziej'
import { szuler } from './characters/szuler'
import { wojownik } from './characters/wojownik'
import { szantazysta } from './characters/szantazysta'
import { szamanka } from './characters/szamanka'
import { szaman } from './characters/szaman'
import { indianieKilling } from './characters/indianieKilling'
import { indianieStatue } from './characters/indianieStatue'
import { samotnyKojot } from './characters/samotnyKojot'
import { lornecieOko } from './characters/lornecieOko'
import { plonacySzal } from './characters/plonacySzal'
import { sedzia } from './characters/sedzia'
import { burmistrz } from './characters/burmistrz'
export interface Actions {
    [keys: string]: Function;
}
export const playerActions = {
    dziwka: dziwka,
    pastor: pastor,
    szeryf: szeryf,
    opoj: opoj,
    hazardzista: hazardzista,
    hazardzistaKilling: hazardzistaKilling,
    bandyciInspection: bandyciInspection,
    bandyciStatue: bandyciStatue,
    msciciel: msciciel,
    zlodziej: zlodziej,
    szuler: szuler,
    wojownik: wojownik,
    szamanka: szamanka,
    szaman: szaman,
    samotnyKojot: samotnyKojot,
    lornecieOko: lornecieOko,
    plonacySzal: plonacySzal,
    indianieKilling: indianieKilling,
    indianieStatue: indianieStatue,
    szantazysta: szantazysta,
    uwodziciel: uwodziciel,
    kat: kat,
    sedzia: sedzia,
    burmistrz: burmistrz
} as Actions