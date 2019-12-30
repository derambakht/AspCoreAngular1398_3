using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.Base
{
    public class CityViewModel
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public int SortOrder { get; set; }
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string Body { get; set; }
    }
}
