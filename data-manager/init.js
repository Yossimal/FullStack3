import {ldb as ldbjs} from '../LDBJS/ldb.js'

export var ldb;

export function init(connectionString){
    ldb = ldbjs();
}