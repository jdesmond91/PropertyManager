using System.Web;
using System.Web.Optimization;

namespace PropertyManager
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/bundles/propertymanagerapp/style").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/font-awesome.min.css",
                     "~/app/Vendor/metisMenu.css",
                     "~/app/main.css"));

            bundles.Add(new ScriptBundle("~/bundles/propertymanagerapp/script").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-resource.js",
                      "~/Scripts/jquery-1.10.2.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                      "~/Scripts/bootstrap.min.js",  
                      "~/app/Vendor/metisMenu.js",
                      "~/app/Vendor/angular-modal-service.min.js",
                      "~/app/app.js",
                      //SERVICES
                      "~/app/Services/common.services.js",
                      "~/app/Services/announcementService.js",
                      "~/app/Services/apartmentService.js",
                      "~/app/Services/facilityService.js",
                      "~/app/Services/leaseService.js",
                      "~/app/Services/loginService.js",
                      "~/app/Services/serviceService.js",
                      "~/app/Services/tenantService.js",
                      "~/app/Services/unitService.js",
                      "~/app/Services/unitphotoService.js",
                      "~/app/Services/userProfile.js",
                      //CONTROLLERS
                      "~/app/Controllers/announcementController.js",
                      "~/app/Controllers/apartmentController.js",
                      "~/app/Controllers/facilityController.js",
                      "~/app/Controllers/headerController.js",
                      "~/app/Controllers/homeController.js",
                      "~/app/Controllers/leaseController.js",
                      "~/app/Controllers/loginController.js",
                      "~/app/Controllers/registerController.js",
                      "~/app/Controllers/serviceController.js",
                      "~/app/Controllers/tenantController.js",
                      "~/app/Controllers/unitController.js",
                      "~/app/Controllers/unitphotoController.js"));
        }
    }
}
