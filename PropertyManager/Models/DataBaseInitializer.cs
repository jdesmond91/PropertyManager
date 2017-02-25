using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;

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
                    Surname = "Adm"
                };
                var result = await userManager.CreateAsync(user, "PropertyApp123");
                if (result.Succeeded)
                {
                    // Add claims                   
                    await userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, "Administrator"));
                }
            }
        }
    }
}