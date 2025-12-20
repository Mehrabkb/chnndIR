  <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Welcome Back!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group position-relative">
                            <label for="phone" class="form-label">شماره تلفن همراه</label>
                            <input type="tel" class="form-control" id="phone" name="phone" placeholder="09123456789"
                                required>
                            <small id="phoneError" class="text-danger" style="display:none;">
                                شماره وارد شده صحیح نیست
                            </small>
                        </div>

                        <button class="btn btn-outline-secondary mt-2" type="button" id="getCodeBtn">
                            دریافت کد فعالسازی
                        </button>

                        <div class="form-group mt-3 d-none" id="activationCodeGroup">
                            <label for="activationCode" class="form-label">کد فعالسازی</label>
                            <input type="number" class="form-control" id="activationCode" name="activationCode"
                                placeholder="کد ارسال شده را وارد کنید" required>
                        </div>

                        <button class="btn btn-warning w-100 mt-3 d-none" type="submit" id="loginBtn">
                            ورود
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
