const ID = "clean-combat-tracker"

Hooks.on('updateCombatant', async function (combatant, update) {
    if (game.user.role == 4) {
        let actor = game.actors.get(combatant.actorId);
        if (actor.type == "npc" && update.defeated === true) {
            combatant.delete();
        }
    }
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => { registerPackageDebugFlag(ID); });

function log(force, ...args) {
    const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(ID);

    if (shouldLog) {
        console.log(ID, '|', ...args);
    }
}