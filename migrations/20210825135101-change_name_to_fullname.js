module.exports = {
    function up(db) {
        return db.collection('users').updateMany({}, { $rename: { name: "fullName" } })
    }

    function down(db) {
        return db.collection('users').updateMany({}, { $rename: { fullName: "name" } })
    }
}
