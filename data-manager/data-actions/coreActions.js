

export function readAll(db){
    return JSON.parse(localStorage.getItem(db))
}

export function saveAll(db,data){
    localStorage.setItem(db,JSON.stringify(data));
}
