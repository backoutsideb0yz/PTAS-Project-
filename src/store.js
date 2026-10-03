const store = {
    users: [],
    projects: [],
    members: [],
    tasks: [],
    comments: [],
    seq: {users: 1,  projects: 1, tasks: 1, comments: 1},
};

function nextId(entity) {
    return store.seq[name]++;
}

module.exports = { store, nextId };