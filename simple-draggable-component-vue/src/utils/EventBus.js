export default class EventBus
{
    static _events = {};
    static emit(event, ...args)
    {
        for(let f of EventBus._events[event])
        {
            f(...args);
        }
    }
    static on(event, func)
    {
        if(Object.keys(EventBus._events).includes(event))
        {
            EventBus._events[event].push(func)
        }
    }
}