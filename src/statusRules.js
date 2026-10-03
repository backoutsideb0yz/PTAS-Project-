const STATUSES = ['a_fazer', 'em_andamento', 'concluida'];

const TRANSITIONS = {
    a_fazer: ['em_andamento'],
    em_andamento: ['a_fazer', 'concluida'],
    concluida: ['em_andamento'],
};

function canTransition(from, to) {
    return (TRANSITIONS[from] || []).includes(to);
}

module.exports = {STATUSES, TRANSITIONS, canTransition};