<?php $myvar="false"; 
?>
<div class="app-main__outer">
    <div id="refreshData">
            
        <div class="app-main__inner">
            <div class="app-page-title">
                        <div class="page-title-wrapper">
                            <div class="page-title-heading">
                                <div class="page-title-icon">
                                    <i class="pe-7s-car icon-gradient bg-mean-fruit">
                                    </i>
                                </div>
                                <div>Welcome <?php echo strtoupper($selExmneeData['exmne_fullname']); ?>
                                    
                                </div>
                            </div>
                        </div>
            </div> 

            <div class="row">
                <div class="col-md-12">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Exam's</div>
                        <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Name</th>
                                        <th class="text-center">Course</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead> 
                                <tbody>

                                <?php 
                                    include './query/selectData.php';
                                    if($selExam->rowCount() > 0)
                                    {
                                        while ($selExamRow = $selExam->fetch(PDO::FETCH_ASSOC)) { ?>

                                        <tr>
                                        <td class="text-center text-muted"><?php echo $selExamRow['ex_id']; ?></td>
                                            <td>
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                    <div class="widget-content-left flex2">
                                                        <div class="widget-heading"><?php echo $selExamRow['ex_title']; ?></div>
                                                        <div class="widget-subheading opacity-7"><?php echo $selExamRow['ex_description']; ?></div>
                                                    </div>
                                                </div>
                                                </div>
                                        </td>
                                        <td class="text-center">

                                            <?php 
                                                $courseId =  $selExamRow['cou_id']; 
                                                $selCourse = $conn->query("SELECT * FROM course_tbl WHERE cou_id='$courseId' ");
                                                while ($selCourseRow = $selCourse->fetch(PDO::FETCH_ASSOC)) {
                                                    echo $selCourseRow['cou_name'];
                                                }
                                            ?>

                                        </td>
                                        <td class="text-center">
                                            <?php   ?>
                                            <div class="badge badge-warning">On Going</div>
                                            <?php ?>
                                        
                                        </td>
                                        <td class="text-center">
                                            <a id="startQuiz" data-id="<?php echo $selExamRow['ex_id']; ?>" type="button" class="btn btn-primary btn-sm">Open</button>
                                        </td>
                                    </tr>
                                            
                                        <?php }
                                    }
                                    else
                                    { ?>
                                        <a href="#">
                                            <i class="metismenu-icon"></i>No Exam's @ the moment
                                        </a>
                                    <?php }
                                ?>

                                
                                </tbody>      
                            </table>
                        </div>
                                    
                    </div>
                </div>
            </div>
            
                    


               
        </div>
    </div>
</div>
