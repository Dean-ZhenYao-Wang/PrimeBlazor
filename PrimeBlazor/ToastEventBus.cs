using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class ToastEventBus
    {
        private Dictionary<string, List<Action<object>>> listeners = new Dictionary<string, List<Action<object>>>();
        private Dictionary<string, List<Action>> listenersAction = new Dictionary<string, List<Action>>();
        public void on(string message, Action<object> listener)
        {
            if (!listeners.ContainsKey(message))
            {
                listeners.Add(message, new List<Action<object>>());
            }
            listeners[message].Add((Action<object>)listener);
        }
        public void on(string message, Action listener)
        {
            if (!listenersAction.ContainsKey(message))
            {
                listenersAction.Add("removeAllGroups", new List<Action>());
            }
            listenersAction[message].Add(listener);
        }
        public void add(Message message)
        {
            if (listeners.ContainsKey("add"))
                listeners["add"].ForEach(m => m.Invoke(message));
        }
        public void removeGroup(string group)
        {
            if (listeners.ContainsKey("removeGroup"))
                listeners["removeGroup"].ForEach(m => m.Invoke(group));
        }
        public void removeAllGroups()
        {
            foreach (var item in listenersAction["removeAllGroups"])
            {
                item.Invoke();
            }
        }
    }
}
