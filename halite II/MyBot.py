
import hlt
import logging
from collections import OrderedDict
game = hlt.Game("Settler-v2")
logging.info("Starting my Settler bot!")



while True:
    game_map = game.update_map()
    command_queue = []


    # For every ship that I control
    for ship in game_map.get_me().all_ships():
        shipid = ship.id
        if ship.docking_status != ship.DockingStatus.UNDOCKED:
            # Skip this ship
            continue

        # get all entities (planet/ship me/other) sort by distance to the current ship from nearest to farest
        entities_by_distance = game_map.nearby_entities_by_distance(ship)
        entities_by_distance = OrderedDict(sorted(entities_by_distance.items(), key=lambda t: t[0]))

        # main target : nearest empty planets
        closest_empty_planets = []
        for d in entities_by_distance:
            e = entities_by_distance[d][0]
            if isinstance(e, hlt.entity.Planet) and not e.is_owned():
                closest_empty_planets.append(e)

        # secondary target : ennemy ships
        team_ships = game_map.get_me().all_ships()
        closest_enemy_ships = []
        for d in entities_by_distance:
            e = entities_by_distance[d][0]
            if isinstance(e, hlt.entity.Ship) and e not in team_ships:
                closest_enemy_ships.append(e)

        # First objective: Are there empty planets? Can we dock?
        if len(closest_empty_planets) > 0:
            e = closest_empty_planets[0]
            if ship.can_dock(e):
                command_queue.append(ship.dock(e))
            else:
                navigate_command = ship.navigate(
                    ship.closest_point_to(e),
                    game_map,
                    speed=int(hlt.constants.MAX_SPEED),
                    ignore_ships=False)
                if navigate_command:
                    command_queue.append(navigate_command)
        # If there are no empty planets, attack others
        elif len(closest_enemy_ships) > 0:
            s = closest_enemy_ships[0]
            navigate_command = ship.navigate(
                ship.closest_point_to(s),
                game_map,
                speed=int(hlt.constants.MAX_SPEED),
                ignore_ships=False)
            if navigate_command:
                command_queue.append(navigate_command)
            
    game.send_command_queue(command_queue)
    # TURN END
# GAME END
