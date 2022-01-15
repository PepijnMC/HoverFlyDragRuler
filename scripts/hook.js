Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class HoverFlySpeedProvider extends SpeedProvider {
        getCostForStep(token, area, options={}) {
			// Lookup the cost for each square occupied by the token
			options.token = token;
			if (token.actor.data.data.attributes.movement["hover"] || token.actor.data.data.attributes.movement["fly"])
				return 1;
			const costs = area.map(space => terrainRuler.getCost(space.x, space.y, options));
			// Return the maximum of the costs
			return costs.reduce((max, current) => Math.max(max, current))
		}
    }

    dragRuler.registerModule("hover-fly-drag-ruler", HoverFlySpeedProvider)
})
