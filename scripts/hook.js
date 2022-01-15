Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class HoverFlySpeedProvider extends SpeedProvider {
		get colors() {
			return [
				{id: "walk", default: 0x00FF00, name: "drag-ruler.genericSpeedProvider.speeds.walk"},
				{id: "dash", default: 0xFFFF00, name: "drag-ruler.genericSpeedProvider.speeds.dash"}
			]
		}
	
		getRanges(token) {
			const speedAttribute = "actor.data.data.attributes.movement.walk";
			if (!speedAttribute)
				return []
			const tokenSpeed = parseFloat(getProperty(token, speedAttribute));
			if (tokenSpeed === undefined) {
				console.warn(`Drag Ruler (Generic Speed Provider) | The configured token speed attribute "${speedAttribute}" didn't return a speed value. To use colors based on drag distance set the setting to the correct value (or clear the box to disable this feature).`)
				return []
			}
			const dashMultiplier = 2;
			if (!dashMultiplier)
				return [{range: tokenSpeed, color: "walk"}]
			return [{range: tokenSpeed, color: "walk"}, {range: tokenSpeed * dashMultiplier, color: "dash"}];
		}
	

        getCostForStep(token, area, options={}) {
			// Lookup the cost for each square occupied by the token
			options.token = token;
			if (token.actor.data.data.attributes.movement["hover"] || token.actor.data.data.attributes.movement["fly"])
				return 1;
			const costs = area.map(space => terrainRuler.getCost(space.x, space.y, options));
			// Return the maximum of the costs
			return costs.reduce((max, current) => Math.max(max, current));
		}
    }

    dragRuler.registerModule("hover-fly-drag-ruler", HoverFlySpeedProvider)
})
