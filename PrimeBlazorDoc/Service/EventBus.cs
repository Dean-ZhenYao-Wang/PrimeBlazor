namespace PrimeBlazorDoc.Service
{
    public class EventBus
    {
        private Dictionary<string, List<Action<object>>> listeners = new Dictionary<string, List<Action<object>>>();
        private Dictionary<string, List<Action>> listenersAction = new Dictionary<string, List<Action>>();
        public void on(string eventName, Action<object> listener)
        {
            if (!listeners.ContainsKey(eventName))
            {
                listeners.Add(eventName, new List<Action<object>>());
            }
            listeners[eventName].Add((Action<object>)listener);
        }
        public void on(string eventName, Action listener)
        {
            if (!listenersAction.ContainsKey(eventName))
            {
                listenersAction.Add(eventName, new List<Action>());
            }
            listenersAction[eventName].Add(listener);
        }
        public void emit(string eventName,object data)
        {
            if (listeners.ContainsKey(eventName))
                listeners[eventName].ForEach(m => m.Invoke(data));
        }
        public void emit(string eventName)
        {
            if (listeners.ContainsKey(eventName))
                listenersAction[eventName].ForEach(m => m.Invoke());
        }
    }
}
