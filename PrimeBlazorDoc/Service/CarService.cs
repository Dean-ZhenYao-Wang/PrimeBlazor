using System.Net.Http.Json;

namespace PrimeBlazorDoc.Service
{
    public class CarService
    {
        private HttpClient http;
        public CarService(HttpClient httpClient)
        {
            http = httpClient;
        }
        public async Task<List<Models.Car>> getCarsSmall()
        {
            return await http.GetFromJsonAsync<List<Models.Car>>("assets/data/cars-small.json");
        }
        public async Task<List<Models.Car>> getCarsMedium()
        {
            return await http.GetFromJsonAsync<List<Models.Car>>("assets/data/cars-medium.json");
        }
        public async Task<List<Models.Car>> getCarsLarge()
        {
            return await http.GetFromJsonAsync<List<Models.Car>>("assets/data/cars-large.json");
        }
    }
}
