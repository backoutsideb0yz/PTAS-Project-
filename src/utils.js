const { store } = require('./store');

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

function isMember (projectId, userId) {
    return store.members.some((m) => m.projectId === projectId && m.userId === userId);
}

function getProjectAsMember(projectId, userId) {
    const project = store.projects.find((p) => p.id === projectId);
    if (!project) throw new HttpError(404, "projeto não encontrado");
    if (!isMember(projectId, userId)) throw new HttpError(403, "usuário não é membro do projeto");
    return project;
}

function isValidDate(value) {
     return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
}

module.exports = { HttpError, isMember, getProjectAsMember, isValidDate };