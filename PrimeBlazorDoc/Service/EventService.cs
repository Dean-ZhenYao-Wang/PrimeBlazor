using System.Net.Http.Json;

namespace PrimeBlazorDoc.Service
{
    public class EventService
    {
        private HttpClient http;
        public EventService(HttpClient httpClient)
        {
            http = httpClient;
        }
        public async Task<List<Models.Event>> getEvents()
        {
            return await http.GetFromJsonAsync<List<Models.Event>>("assets/data/events.json");
        }
    }
}
