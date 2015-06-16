<div id="demographics">
<h2 class="statsH2">General statistics{if $CurrentSite} for {$CurrentSite.Name}{/if}
{if $CurrentProject} for {$CurrentProject.Name} {/if}</h2>

<div class="col-sm-2">
{html_options id="DemographicSite" options=$Sites name="DemographicSite" selected=$CurrentSite.ID class="form-control"}
</div>
<div class="col-sm-3">
{html_options id="DemographicProject" options=$Projects name="DemographicProject" selected=$CurrentProject.ID class="form-control"}
</div>

<script type="text/javascript" src="GetJS.php?Module=statistics&file=form_stats_demographic.js"></script>
<button  onClick="updateDemographicTab()" class="btn btn-primary btn-small">Submit Query</button>

