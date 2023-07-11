const ID = "clean-combat-tracker"

Hooks.on('updateActor', async function(actor, change) {
    if (game.user.role == 4) {
        if(actor.type === "npc" && change.system.attributes.hp.value === 0) {
            let combatant = game.combat.getCombatantByActor(actor._id);
            if(combatant){
                combatant.delete();
                log(false, combatant);
            }
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