<?php 
session_start();

if(!isset($_SESSION['examineeSession']['examineenakalogin']) == true) header("location:index.php");


 ?>
<?php include("conn.php"); ?>
<!--  HEADER -->
<?php include("includes/header.php"); ?>      

<!-- UI THEME  -->
<?php //include("includes/ui-theme.php"); ?>

<div class="app-main">
<!-- sidebar  -->

<?php 
if(isset($_GET['page'])){
  if($_GET['page']=="exam"){
  echo "";
  }else{
  include("includes/sidebar.php");
}

}else{
  include("includes/sidebar.php");
}

 ?>



<!-- Condition If  -->
<?php 
   @$page = $_GET['page'];


   if($page != '')
   {
     if($page == "exam")
     {
       include("pages/exam.php");
     }
     else if($page == "result")
     {
       include("pages/result.php");
     }
     else if($page == "myscores")
     {
       include("pages/myscores.php");
     }
     
   }
   // Else home display
   else
   {
     include("pages/home.php"); 
   }


 ?> 


<!--  FOOTER -->
<?php include("includes/footer.php"); ?>

<?php include("includes/modals.php"); ?>


