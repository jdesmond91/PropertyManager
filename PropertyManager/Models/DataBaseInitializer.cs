using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using PropertyManager.Controllers;

namespace PropertyManager.Models
{
    public class DataBaseInitializer
    {
        public static async void LoadUserAccounts()
        {
            // Get a reference to the objects we need
            var ds = new ApplicationDbContext();
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(ds));

            // Add the user(s) that the app needs when loaded for the first time
            // Change any of the data below to better match your app's needs
            if (userManager.Users.Count() == 0)
            {
                var user = new ApplicationUser
                {
                    UserName = "admin@propertymanager.com",
                    Email = "admin@propertymanager.com",
                    GivenName = "Administrator",
                    Surname = "Adm",
                    Role = "Administrator"
                };
                var result = await userManager.CreateAsync(user, "PropertyApp123");
                if (result.Succeeded)
                {
                    // Add claims                   
                    await userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, "Administrator"));
                }
            }
        }

        public static async void LoadSampleData()
        {
            Manager m = new Controllers.Manager();

            if (m.UnitGetAll().Count() == 0)
            {
                var unit = new UnitAdd();

                unit.Bedrooms = 2;
                unit.Bathrooms = 1;
                unit.SquareFeet = 100.5;
                unit.MaxOccupants = 3;
                unit.Balcony = true;
                unit.Dishwasher = true;
                unit.Laundry = false;
                m.UnitAdd(unit);
            }

            if(m.ApartmentGetAll().Count() == 0)
            {
                var apt = new ApartmentAdd();

                apt.ApartmentNumber = 520;
                apt.FloorNumber = 5;
                apt.Status = "Occupied";
                apt.UnitId = 1;

                m.ApartmentAdd(apt);
            }

            if(m.TenantGetAll().Count() == 0)
            {
                var tenant = new TenantAdd();

                tenant.FirstName = "Amanda";
                tenant.LastName = "Marques";
                tenant.MobilePhone = "6475357732";
                tenant.HomePhone = "";
                tenant.Email = "amanda@test.ca";
                tenant.BirthDate = new DateTime(1988, 12, 23);

                m.TenantAdd(tenant);
            }

            if(m.LeaseGetAllWithInformation().Count() == 0)
            {
                var lease = new LeaseAdd();
                lease.StartDate = new DateTime(2016, 01, 01);
                lease.EndDate = new DateTime(2018, 01, 01);
                lease.SecurityDeposit = 500.00;
                lease.MonthlyRent = 1050.60;
                lease.Terms = 1;
                lease.ApartmentNumber = 520;
                lease.TenantId = 1;

                m.LeaseAdd(lease);

                var user = new ApplicationUser
                {
                    UserName = "amanda@test.ca",
                    Email = "amanda@test.ca",
                    GivenName = "Amanda",
                    Surname = "Marques",
                    Role = "Tenant"
                };

                var ds = new ApplicationDbContext();
                var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(ds));

                var result = await userManager.CreateAsync(user, "Asdf4321!");
                if (result.Succeeded)
                {
                    // Add claims                   
                    await userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, "Tenant"));
                }
            }

            if(m.EmployeeGetAll().Count() == 0)
            {
                var employee = new EmployeeAdd();
                employee.LastName = "Marques";
                employee.FirstName = "Amanda";
                employee.Title = "Supervisor";
                employee.BirthDate = new DateTime(1988, 12, 23);
                employee.HireDate = new DateTime(2017, 02, 06);
                employee.Address = "Wellesley St";
                employee.City = "Toronto";
                employee.State = "ON";
                employee.Country = "Canada";
                employee.PostalCode = "m4x 1g5";
                employee.Fax = "4165789654";
                employee.Email = "amandamc@hotmail.com";
                employee.Phone = "6475895357";
                m.EmployeeAdd(employee);

                employee.LastName = "Desmond";
                employee.FirstName = "Jonathan";
                employee.Title = "Manager";
                employee.BirthDate = new DateTime(1990, 11, 16);
                employee.HireDate = new DateTime(2017, 01, 05);
                employee.Address = "Pond Rd";
                employee.City = "Toronto";
                employee.State = "ON";
                employee.Country = "Canada";
                employee.PostalCode = "m6h 18h";
                employee.Fax = "4168547523";
                employee.Email = "jonathan@hotmail.com";
                employee.Phone = "6478965236";
                m.EmployeeAdd(employee);

                employee.LastName = "Capello";
                employee.FirstName = "Silvia";
                employee.Title = "Clerk";
                employee.BirthDate = new DateTime(1958, 01, 09);
                employee.HireDate = new DateTime(2016, 04, 28);
                employee.Address = "Aluisio St";
                employee.City = "Toronto";
                employee.State = "ON";
                employee.Country = "Canada";
                employee.PostalCode = "j7g 1s3";
                employee.Fax = "416532065";
                employee.Email = "silvia@hotmail.com";
                employee.Phone = "6476523105";
                m.EmployeeAdd(employee);
            }

            if(m.AnnouncementGetAll().Count() == 0)
            {
                var announce = new AnnouncementAdd();
                announce.Title = "Laundry closed";
                announce.StartDate = new DateTime(2017, 05, 05);
                announce.ExpireDate = new DateTime(2017, 05, 06);
                announce.Description = "The laundry room will be closed for maintenance";
                m.AnnouncementAdd(announce);
               
                announce.Title = "Cleaning of corridor";
                announce.StartDate = new DateTime(2017, 04, 20);
                announce.ExpireDate = new DateTime(2017, 04, 22);
                announce.Description = "The carpet will be cleaned on the upcoming weekend";
                m.AnnouncementAdd(announce);
            }
    
        }
    }
}