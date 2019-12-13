"use strict";
/**
 * A pairing of a user specified event object and the schedule which defines
 * when it occurs on a calendar.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var Event = (function () {
    /**
     * Creates a new event.
     *
     * @param schedule The schedule which defines when the event occurs.
     * @param data User specified object which describes this event.
     * @param id User specified ID which identifies this event.
     */
    function Event(schedule, data, id, visible) {
        if (visible === void 0) { visible = true; }
        this.schedule = schedule;
        this.data = data;
        this.id = id;
        this.visible = visible;
    }
    return Event;
}());
export { Event };
//# sourceMappingURL=Event.js.map