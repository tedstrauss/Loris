<div id="data_entry">
<h2 class="statsH2">Data Entry Statistics  {if $CurrentProject} for {$CurrentProject.Name} {/if}</h2>
<script type="text/javascript" src="GetJS.php?Module=statistics&file=form_stats_behavioural.js"></script>
<div class="col-sm-2">
  {html_options id="BehaviouralProject" options=$Projects name="BehaviouralProject" selected=$CurrentProject.ID class="form-control"}
</div>
<button class="btn btn-primary btn-sm" onClick="updateBehaviouralTab()">Submit Query</button>


<div id="behavioural">
    <h2 class="statsH2">Data Entry Statistics  {if $CurrentProject} for {$CurrentProject.Name} {/if}</h2>
    <script type="text/javascript" src="GetJS.php?Module=statistics&file=form_stats_behavioural.js"></script>

hello world
