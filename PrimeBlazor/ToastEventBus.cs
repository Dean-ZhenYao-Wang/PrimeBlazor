using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class ToastEventBus
    {
        private static Dictionary<string, List<Action<Message>>> listeners = new Dictionary<string, List<Action<Message>>>();
        public static void on(string message, Action<Message> listener)
        {
            if (!listeners.ContainsKey(message))
            {
                listeners.Add(message, new List<Action<Message>>());
            }
            listeners[message].Add(listener);
        }
        public static void add(Message message)
        {
            if (listeners.ContainsKey("add"))
                listeners["add"].ForEach(m => m.Invoke(message));
        }
    }
}
