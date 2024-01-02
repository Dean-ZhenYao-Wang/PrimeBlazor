using System.Net.Http.Json;

namespace PrimeBlazorDoc.Service
{
    public class CountryService
    {
        private HttpClient http;
        public CountryService(HttpClient httpClient)
        {
            http = httpClient;
        }
        public async Task<List<Models.Countries>> getCountries()
        {
            return await http.GetFromJsonAsync<List<Models.Countries>>("assets/data/countries.json");
        }
    }
}
