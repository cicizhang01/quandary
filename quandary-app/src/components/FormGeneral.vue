<template>
  <div class="section">
    <div class="field is-horizontal is-grouped is-grouped-centered">
      <div class="field">
        <label class="label is-medium">First Name</label>
        <div class="control">
          <input class="input is-light" type="text" placeholder="e.g Jane ">
        </div>
      </div>
      
      <div class="field-last-name">
        <label class="label is-medium">Last Name</label>
        <div class="control">
          <input class="input is-light" type="text" placeholder="e.g Doe ">
        </div>
      </div>

      <div class="field">
        <label class="label is-medium">Pronouns</label>
        <span class="select is-light">
          <select>
            <option selected></option>
            <option>she/her/hers</option>
            <option>he/him/his</option>
            <option>they/them</option>
          </select>
        </span>
      </div>
    </div>
    
    
  </div>
</template>

<style lang="scss">
@import "../assets/colors";
  .field {
    padding: 0px 30px 0px 30px;
  }
  .field-last-name {
    padding: 0px 70px 0px 0px;
  }
  .control {
    padding: 0px 0px 20px 0px;
  }
  .next-button {
    margin-top: 90px;
  }
</style>