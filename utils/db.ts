import * as SQLite from 'expo-sqlite';
let database_name = "db.maps"

export async function createTables(){

    const db = SQLite.openDatabase(database_name);
    let query = 
    "CREATE TABLE IF NOT EXISTS list_elements (id INTEGER PRIMARY KEY NOT NULL,completed BOOLEAN NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);"

    db.transaction((tx) =>
        tx.executeSql(query, [], 
            (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
                console.log("Se inicializado la bd")
            }, (tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                console.error("error: " + error.message);
                return true;
            }
        )
    );
}

export async function createTask(
    id: number,
    completed: boolean,
    lat: number, 
    lng: number, 
) {
    const db = SQLite.openDatabase(database_name);
    let query = 
    "INSERT INTO list_elements (id, completed, lat, lng) VALUES (?,?,?,?);"

    db.transaction((tx) =>
        tx.executeSql(query, [id, String(completed), lat, lng], 
            (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
                console.log("Se ha insertado en la bdd")
            }, (tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                console.error("error: " + error.message);
                return true;
            }
        )
    );
}

export async function getTaskList(){
    const db = SQLite.openDatabase(database_name);
    let query = 
    "SELECT * FROM list_elements;"
    let taskList: any[] = [];

    return new Promise((resolve, reject) => {
        db.transaction((tx) =>
            tx.executeSql(query, [], 
                (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
                    for (let index = 0; index < result.rows.length; index++) {
                        taskList.push(result.rows.item(index));
                    }
                    resolve(taskList);
                }, (tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                    reject(error);
                    return true;
                }
            )
        );
    });
}