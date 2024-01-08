using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class ToastEventBus
    {
        private static Dictionary<string, List<Action<object>>> listeners = new Dictionary<string, List<Action<object>>>();
        private static Dictionary<string, List<Action>> listenersAction = new Dictionary<string, List<Action>>();
        public static void on(string message, Action<object> listener)
        {
            if (!listeners.ContainsKey(message))
            {
                listeners.Add(message, new List<Action<object>>());
            }
            listeners[message].Add((Action<object>)listener);
        }
        public static void on(string message, Action listener)
        {
            if (!listenersAction.ContainsKey(message))
            {
                listenersAction.Add("removeAllGroups", new List<Action>());
            }
            listenersAction[message].Add(listener);
        }
        public static void add(Message message)
        {
            if (listeners.ContainsKey("add"))
                listeners["add"].ForEach(m => m.Invoke(message));
        }
        public static void removeGroup(string group)
        {
            if (listeners.ContainsKey("removeGroup"))
                listeners["removeGroup"].ForEach(m => m.Invoke(group));
        }
        public static void removeAllGroups()
        {
            foreach (var item in listenersAction["removeAllGroups"])
            {
                item.Invoke();
            }
        }
    }
}
