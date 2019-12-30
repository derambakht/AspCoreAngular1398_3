using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("Cities", Schema = "Base")]
    public partial class Cities
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(128)]
        public string CityName { get; set; }
        public int ProvinceId { get; set; }
        [StringLength(1000)]
        public string Body { get; set; }
        public int? SortOrder { get; set; }

        [ForeignKey(nameof(ProvinceId))]
        [InverseProperty(nameof(Provinces.Cities))]
        public virtual Provinces Province { get; set; }
    }
}
